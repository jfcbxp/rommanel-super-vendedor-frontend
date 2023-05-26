import { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../models/user.model";
import { useSchedulingService } from "../services/scheduling.service";
import { Schedule } from "../models/schedule.model";
import { useSignInService } from "../services/sign-in.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Dialog } from "../components/modals/dialog";
import { SchedulingTotalizer } from "../models/scheduling.totalizer.model";
import { useSchedulingTotalizerService } from "../services/scheduling.totalizers.service";
import { Loading } from "../components/modals/loading";
import { WalletTotalizer } from "../models/wallet.totalizer.model";
import { useWalletWalletTotalizerService } from "../services/wallet.totalizers.service";
import { Wallet } from "../models/wallet.model";
import { useWalletService } from "../services/wallet.service";
import { BillingProgress } from "../models/billing.progress.model";
import { useBillingProgressService } from "../services/billing.progress.service";
import { useBillingService } from "../services/billing.service";
import { BillingModel } from "../models/billing.model";
import { useMetaService } from "../services/meta.service";
import { Meta } from "../models/meta.model";
import { NavigationParams } from "../types/navigation.params";
import { useNavigation } from "@react-navigation/native";

type ContextProps = {
  user: User | undefined;
  token: string | undefined;
  meta: Meta | undefined;
  dailyTotalizer: SchedulingTotalizer | undefined;
  monthlyTotalizer: SchedulingTotalizer | undefined;
  schedules: Schedule[] | undefined;
  activesTotalizer: WalletTotalizer | undefined;
  inactivesTotalizer: WalletTotalizer | undefined;
  wallets: Wallet[] | undefined;
  billingTitle: string | undefined;
  billings: BillingModel[] | undefined;
  billingProgresses: BillingProgress[] | undefined;
  loading: boolean;
  getMeta(): Promise<void>;
  getSchedules(): Promise<void>;
  getWallets(): Promise<void>;
  getBillingProgresses(): Promise<void>;
  getBilling(_date: string): Promise<void>;
  handleChangeBillingTitle(
    _title: string
  ): void;
  signIn(_code: string, _password: string): Promise<void>;
  signOut(): Promise<void>;
};

const defaultState = {
  user: undefined,
  token: undefined,
  meta: undefined,
  dailyTotalizer: undefined,
  monthlyTotalizer: undefined,
  schedules: undefined,
  activesTotalizer: undefined,
  inactivesTotalizer: undefined,
  wallets: undefined,
  billingTitle: undefined,
  billings: undefined,
  billingProgresses: undefined,
  loading: true,
  getMeta: async () => { },
  getSchedules: async () => { },
  getWallets: async () => { },
  getBillingProgresses: async () => { },
  getBilling: async () => { },
  handleChangeBillingTitle: () => { },
  signIn: async () => { },
  signOut: async () => { },
};

export const Context = createContext<ContextProps>(defaultState);

type ProviderProps = {
  children?: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const navigation = useNavigation<NavigationParams>()
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [meta, setMeta] = useState<Meta>();
  const [dailyTotalizer, setDailyTotalizer] = useState<SchedulingTotalizer>();
  const [monthlyTotalizer, setMonthlyTotalizer] =
    useState<SchedulingTotalizer>();
  const [schedules, setSchedules] = useState<Schedule[]>();
  const [activesTotalizer, setActivesTotalizer] = useState<WalletTotalizer>();
  const [inactivesTotalizer, setInactivesTotalizer] =
    useState<WalletTotalizer>();
  const [wallets, setWallets] = useState<Wallet[]>();
  const [billingTitle, setBillingTitle] = useState<string>()
  const [billings, setBillings] = useState<BillingModel[]>();
  const [billingProgresses, setBillingProgresses] =
    useState<BillingProgress[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const defaultDialog = { title: "", content: "", visible: false };
  const [dialog, setDialog] = useState(defaultDialog);
  const signInService = useSignInService();
  const schedulingService = useSchedulingService();
  const schedulingTotalizerService = useSchedulingTotalizerService();
  const walletService = useWalletService();
  const walletTotalizerService = useWalletWalletTotalizerService();
  const billingProgressService = useBillingProgressService();
  const billingService = useBillingService();
  const metaService = useMetaService();

  useEffect(() => {
    const init = async () => {
      if (!user || !token) {
        await _getUser();
        await _getToken();
      };
      init().catch((error) => console.error(error));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      _check(1)
    }
  }, [schedules])

  useEffect(() => {
    if (user) {
      _check(2)
    }
  }, [wallets])

  useEffect(() => {
    if (user) {
      _check(3)
    }
  }, [billingProgresses])

  const signIn = async (code: string, password: string) => {
    setLoading(true);
    await signInService
      .signIn(code, password)
      .then(async (result) => {
        setToken(result.token);
        await _storeToken(result.token);
        setUser(_decodeToken(result.token));
        await _storeUser(_decodeToken(result.token));
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

  const signOut = async () => {
    setLoading(true);
    setUser(undefined);
    setMeta(undefined)
    setBillingProgresses(undefined)
    setSchedules(undefined)
    setBillings(undefined)
    setToken(undefined)
    setDailyTotalizer(undefined)
    setMonthlyTotalizer(undefined)
    setActivesTotalizer(undefined)
    setWallets(undefined)
    setBillingTitle(undefined)
    setInactivesTotalizer(undefined)
    await AsyncStorage.clear();
    setLoading(false);
  };

  const getMeta = async () => {
    setLoading(true)
    if (_isUserAuthenticated() && token) {
      await metaService.get(user?.sub!, token)
        .then(_meta => {
          if (_meta) {
            setMeta(_meta)
          }
        })
    } else {
      await signOut();
      setDialog({
        title: "Sessão expirada",
        content: "Efetue acesso novamente",
        visible: true,
      });
    }
    setLoading(false)
  }

  const getSchedules = async () => {
    setLoading(true);
    if (_isUserAuthenticated() && token) {
      await schedulingService.get(user?.sub!, token)
        .then(_schedules => {
          if (_schedules) {
            setSchedules(_schedules);
          }
        });
      await _getSchedulingTotalizers();
    } else {
      await signOut();
      setDialog({
        title: "Sessão expirada",
        content: "Efetue acesso novamente",
        visible: true,
      });
    }
    setLoading(false);
  };

  const _getSchedulingTotalizers = async () => {
    setLoading(true);
    if (_isUserAuthenticated() && token) {
      await schedulingTotalizerService
        .getDaily(user?.sub!, token)
        .then(_dailyTotalizer => {
          if (_dailyTotalizer) {
            setDailyTotalizer(_dailyTotalizer);
          }
        });
      await schedulingTotalizerService
        .getMontly(user?.sub!, token)
        .then(_monthlyTotalizer => {
          if (_monthlyTotalizer) {
            setMonthlyTotalizer(_monthlyTotalizer);
          }
        });
    }
    setLoading(false);
  };

  const getWallets = async () => {
    setLoading(true);
    if (_isUserAuthenticated() && token) {
      await walletService.get(user?.sub!, token)
        .then(_wallets => {
          if (_wallets) {
            setWallets(_wallets);
          }
        });
      await _getWalletTotalizers();
    } else {
      await signOut();
      setDialog({
        title: "Sessão expirada",
        content: "Efetue acesso novamente",
        visible: true,
      });
    }
    setLoading(false);
  };

  const _getWalletTotalizers = async () => {
    setLoading(true);
    if (_isUserAuthenticated() && token) {
      await walletTotalizerService
        .getActives(user?.sub!, token)
        .then(_activeTotalizer => {
          if (_activeTotalizer) {
            setActivesTotalizer(_activeTotalizer);
          }
        });
      await walletTotalizerService
        .getInactives(user?.sub!, token)
        .then(_inactiveTotalizer => {
          if (_inactiveTotalizer) {
            setInactivesTotalizer(_inactiveTotalizer);
          }
        });
    }
    setLoading(false);
  };

  const getBillingProgresses = async () => {
    setLoading(true);
    if (_isUserAuthenticated() && token) {
      await billingProgressService
        .get(user?.sub!, token)
        .then(_billingProgresses => {
          if (_billingProgresses) {
            setBillingProgresses(_billingProgresses);
          }
        })
    }
    setLoading(false);
  };

  const getBilling = async (_date: string) => {
    if (_isUserAuthenticated() && token) {
      await billingService.get(user?.sub!, _date, token)
        .then(_billings => {
          if (_billings) {
            setBillings(_billings);
          }
        });
    }
  };

  const handleChangeBillingTitle = (_title: string) => {
    setBillingTitle(_title)
  }

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
      const value = await AsyncStorage.getItem("@token");
      if (value) {
        setToken(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _storeToken = async (_token: string) => {
    try {
      await AsyncStorage.setItem("@token", _token);
    } catch (error) {
      console.error(error);
    }
  };

  const _decodeToken = (_token: string) => {
    return jwtDecode<User>(_token);
  };

  const _isUserAuthenticated = () => {
    let isTokenValid = false;
    if (token && user) {
      const expiration = user.exp;
      isTokenValid = expiration * 1000 > Date.now();
    }
    return isTokenValid;
  };

  const _check = (option: number) => {
    const _title = "Nada consta"
    const _content = "Nenhum dado foi encontrado para exibir"
    if (option == 1) {
      if (!schedules || schedules.length == 0) {
        navigation.goBack()
        setDialog({
          title: _title,
          content: _content,
          visible: true
        })
      }
    } else if (option == 2) {
      if (!wallets || wallets.length == 0) {
        navigation.goBack()
        setDialog({
          title: _title,
          content: _content,
          visible: true
        })
      }
    } else if (option = 3) {
      if (!billingProgresses || billingProgresses.length == 0) {
        navigation.goBack()
        setDialog({
          title: _title,
          content: _content,
          visible: true
        })
      }
    }
  }

  const contextValue = useMemo(
    () => ({
      user,
      token,
      meta,
      dailyTotalizer,
      monthlyTotalizer,
      schedules,
      activesTotalizer,
      inactivesTotalizer,
      wallets,
      billingProgresses,
      loading,
      getSchedules,
      getWallets,
      billingTitle,
      billings,
      getMeta,
      getBillingProgresses,
      getBilling,
      handleChangeBillingTitle,
      signIn,
      signOut,
    }),
    [
      user,
      token,
      meta,
      dailyTotalizer,
      monthlyTotalizer,
      schedules,
      activesTotalizer,
      inactivesTotalizer,
      wallets,
      billingProgresses,
      loading,
      getMeta,
      getSchedules,
      getWallets,
      billingTitle,
      billings,
      getBillingProgresses,
      getBilling,
      handleChangeBillingTitle,
      signIn,
      signOut,
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
