import { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../models/user.model";
import { Token } from "../models/token.model";
import { useSchedulingService } from "../services/scheduling.service";
import { Schedule } from "../models/schedule.model";
import { useSignInService } from "../services/sign-in.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Dialog } from "../components/modals/dialog";
import { SchedulingTotalizer } from "../models/scheduling.totalizer.model";
import { useSchedulingTotalizerService } from "../services/scheduling.totalizers.service";
import { Loading } from "../components/modals/loading";
import { BillingProgress } from "../models/billing.progress.model";
import { useBillingProgressService } from "../services/billing.progress.service";
import { useBillingService } from "../services/billing.service";
import { BillingModel } from "../models/billing.model";
import { useMetaService } from "../services/meta.service";
import { Meta } from "../models/meta.model";
import { NavigationParams } from "../types/navigation.params";
import { useNavigation } from "@react-navigation/native";
import { useTokenRenewService } from "../services/token-renew.service";

type ContextProps = {
  user: User | undefined;
  token: Token | undefined;
  meta: Meta | undefined;
  dailyTotalizer: SchedulingTotalizer | undefined;
  monthlyTotalizer: SchedulingTotalizer | undefined;
  schedules: Schedule[] | undefined;
  billingTitle: string | undefined;
  billings: BillingModel[] | undefined;
  billingProgresses: BillingProgress[] | undefined;
  loading: boolean;
  getMeta(): Promise<void>;
  getSchedules(): Promise<void>;
  getBillingProgresses(): Promise<void>;
  getBilling(_date: string): Promise<void>;
  handleChangeBillingTitle(_title: string): void;
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
  meta: undefined,
  dailyTotalizer: undefined,
  monthlyTotalizer: undefined,
  schedules: undefined,
  billingTitle: undefined,
  billings: undefined,
  billingProgresses: undefined,
  loading: true,
  getMeta: async () => {},
  getSchedules: async () => {},
  getBillingProgresses: async () => {},
  getBilling: async () => {},
  handleChangeBillingTitle: () => {},
  signIn: async () => {},
  signOut: async () => {},
  isUserAuthenticated: async () => {},
  startLoading: () => {},
  stopLoading: () => {},
  showDialog: () => {},
};

export const Context = createContext<ContextProps>(defaultState);

type ProviderProps = {
  children?: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const navigation = useNavigation<NavigationParams>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<Token>();
  const [meta, setMeta] = useState<Meta>();
  const [dailyTotalizer, setDailyTotalizer] = useState<SchedulingTotalizer>();
  const [monthlyTotalizer, setMonthlyTotalizer] =
    useState<SchedulingTotalizer>();
  const [schedules, setSchedules] = useState<Schedule[]>();
  const [billingTitle, setBillingTitle] = useState<string>();
  const [billings, setBillings] = useState<BillingModel[]>();
  const [billingProgresses, setBillingProgresses] =
    useState<BillingProgress[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const signInService = useSignInService();
  const tokenRenewService = useTokenRenewService();
  const schedulingService = useSchedulingService();
  const schedulingTotalizerService = useSchedulingTotalizerService();
  const billingProgressService = useBillingProgressService();
  const billingService = useBillingService();
  const metaService = useMetaService();

  useEffect(() => {
    const init = async () => {
      await _getUser();
      await _getToken();
    };
    init().catch((error) => console.error(error));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      _check(1);
    }
  }, [schedules]);

  useEffect(() => {
    if (user) {
      _check(3);
    }
  }, [billingProgresses]);

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
    setLoading(true);
    await tokenRenewService.renewToken(_token).then(async (token_) => {
      setToken(token_);
      await _storeToken(token_);
      setUser(_decodeToken(token_));
      await _storeUser(_decodeToken(token_));
    });
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    setUser(undefined);
    setMeta(undefined);
    setBillingProgresses(undefined);
    setSchedules(undefined);
    setBillings(undefined);
    setToken(undefined);
    setDailyTotalizer(undefined);
    setMonthlyTotalizer(undefined);
    setBillingTitle(undefined);
    await AsyncStorage.clear();
    setLoading(false);
  };

  const getMeta = async () => {
    setLoading(true);
    await isUserAuthenticated().then(async () => {
      if (token) {
        await metaService.get(user?.sub!, token.token).then((_meta) => {
          if (_meta) {
            setMeta(_meta);
          }
        });
      }
    });
    setLoading(false);
  };

  const getSchedules = async () => {
    setLoading(true);
    await isUserAuthenticated().then(async () => {
      if (token) {
        await schedulingService
          .get(user?.sub!, token.token)
          .then((_schedules) => {
            if (_schedules) {
              setSchedules(_schedules);
            }
          });
        await _getSchedulingTotalizers();
      }
    });
    setLoading(false);
  };

  const _getSchedulingTotalizers = async () => {
    setLoading(true);
    await isUserAuthenticated().then(async () => {
      if (token) {
        await schedulingTotalizerService
          .getDaily(user?.sub!, token.token)
          .then((_dailyTotalizer) => {
            if (_dailyTotalizer) {
              setDailyTotalizer(_dailyTotalizer);
            }
          });
        await schedulingTotalizerService
          .getMontly(user?.sub!, token.token)
          .then((_monthlyTotalizer) => {
            if (_monthlyTotalizer) {
              setMonthlyTotalizer(_monthlyTotalizer);
            }
          });
      }
    });
    setLoading(false);
  };

  const getBillingProgresses = async () => {
    setLoading(true);
    await isUserAuthenticated().then(async () => {
      if (token) {
        await billingProgressService
          .get(user?.sub!, token.token)
          .then((_billingProgresses) => {
            if (_billingProgresses) {
              setBillingProgresses(_billingProgresses);
            }
          });
      }
    });
    setLoading(false);
  };

  const getBilling = async (_date: string) => {
    await isUserAuthenticated().then(async () => {
      if (token) {
        await billingService
          .get(user?.sub!, _date, token.token)
          .then((_billings) => {
            if (_billings) {
              setBillings(_billings);
            }
          });
      }
    });
  };

  const handleChangeBillingTitle = (_title: string) => {
    setBillingTitle(_title);
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
        await _renewToken(_token);
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

  const _check = (option: number) => {
    const _title = "Nada consta";
    const _content = "Nenhum dado foi encontrado para exibir";
    if (option == 1) {
      if (!schedules || schedules.length == 0) {
        navigation.goBack();
        setDialog({
          title: _title,
          content: _content,
          visible: true,
        });
      }
    } else if (option == 3) {
      if (!billingProgresses || billingProgresses.length == 0) {
        navigation.goBack();
        setDialog({
          title: _title,
          content: _content,
          visible: true,
        });
      }
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
      meta,
      dailyTotalizer,
      monthlyTotalizer,
      schedules,
      billingProgresses,
      loading,
      getSchedules,
      billingTitle,
      billings,
      getMeta,
      getBillingProgresses,
      getBilling,
      handleChangeBillingTitle,
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
      meta,
      dailyTotalizer,
      monthlyTotalizer,
      schedules,
      billingProgresses,
      loading,
      getMeta,
      getSchedules,
      billingTitle,
      billings,
      getBillingProgresses,
      getBilling,
      handleChangeBillingTitle,
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
