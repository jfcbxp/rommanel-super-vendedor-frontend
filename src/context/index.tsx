import { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../models/user.model";
import { Token } from "../models/token.model";
import { useSignInService } from "../services/sign-in.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Dialog } from "../components/modals/dialog";
import { Loading } from "../components/modals/loading";
import { NavigationParams } from "../types/navigation.params";
import { useNavigation } from "@react-navigation/native";
import { useTokenRenewService } from "../services/token-renew.service";

type ContextProps = {
  user: User | undefined;
  token: Token | undefined;
  date: string | undefined;
  loading: boolean;
  handleChangeDate(_title: string): void;
  signIn(_code: string, _password: string): Promise<void>;
  signOut(): Promise<void>;
  isUserAuthenticated(): Promise<void>;
  startLoading(): void;
  stopLoading(): void;
  showDialog(): void;
};

const defaultState = {
  user: undefined,
  token: undefined,
  date: undefined,
  loading: true,
  handleChangeDate: () => { },
  signIn: async () => { },
  signOut: async () => { },
  isUserAuthenticated: async () => { },
  startLoading: () => { },
  stopLoading: () => { },
  showDialog: () => { },
};

export const Context = createContext<ContextProps>(defaultState);

type ProviderProps = {
  children?: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const navigation = useNavigation<NavigationParams>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<Token>();
  const [date, setDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const signInService = useSignInService();
  const tokenRenewService = useTokenRenewService();

  useEffect(() => {
    const init = async () => {
      await _getUser();
      await _getToken();
    };
    init().catch((error) => console.error(error));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (dialog.visible) {
      navigation.goBack();
    }
  }, [dialog]);

  const signIn = async (code: string, password: string) => {
    setLoading(true);
    await signInService
      .signIn(code, password)
      .then(async (_token) => {
        setToken(_token);
        await _storeToken(_token);
        setUser(_decodeToken(_token));
        await _storeUser(_decodeToken(_token));
      })
      .catch(() => {
        setDialog({
          title: "Credenciais inválidas",
          content: "Código do vendedor e/ou senha incorreto(a)s",
          visible: true,
        });
      });
    setLoading(false);
  };

  const _renewToken = async (_token: Token) => {
    await tokenRenewService.renewToken(_token).then(async (token_) => {
      setToken(token_);
      await _storeToken(token_);
      setUser(_decodeToken(token_));
      await _storeUser(_decodeToken(token_));
    });
  };

  const signOut = async () => {
    setLoading(true);
    setUser(undefined);
    setToken(undefined);
    setDate(undefined);
    await AsyncStorage.clear();
    setLoading(false);
  };

  const handleChangeDate = (_title: string) => {
    setDate(_title);
  };

  const _getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      if (jsonValue) {
        let _user: User = JSON.parse(jsonValue);
        setUser(_user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _storeUser = async (_user: User) => {
    try {
      const jsonValue = JSON.stringify(_user);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  const _getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@token");
      if (jsonValue) {
        let _token: Token = JSON.parse(jsonValue);
        setToken(_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _storeToken = async (_token: Token) => {
    try {
      const jsonValue = JSON.stringify(_token);
      await AsyncStorage.setItem("@token", jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  const _decodeToken = (_token: Token) => {
    return jwtDecode<User>(_token.token);
  };

  const isUserAuthenticated = async () => {
    let isTokenValid = false;
    if (token && user) {
      const expiration = user.exp;
      isTokenValid = expiration * 1000 > Date.now();
    }
    if (!isTokenValid && token) {
      await _renewToken(token);
    }
  };

  const showDialog = async () => {
    const _title = "Nada consta";
    const _content = "Nenhum dado foi encontrado para exibir";
    setLoading(false);
    setDialog({
      title: _title,
      content: _content,
      visible: true,
    });
  };

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };
  const contextValue = useMemo(
    () => ({
      user,
      token,
      loading,
      date,
      handleChangeDate,
      signIn,
      signOut,
      isUserAuthenticated,
      startLoading,
      stopLoading,
      showDialog,
    }),
    [
      user,
      token,
      loading,
      date,
      handleChangeDate,
      signIn,
      signOut,
      isUserAuthenticated,
      startLoading,
      stopLoading,
      showDialog,
    ]
  );

  return (
    <Context.Provider value={contextValue}>
      <Dialog
        title={dialog.title}
        content={dialog.content}
        visible={dialog.visible}
        dismiss={() => {
          setDialog(defaultDialog);
        }}
      />
      <Loading visible={loading} />
      {children}
    </Context.Provider>
  );
};

export default Provider;
