import { createContext, useEffect, useMemo, useState } from 'react';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { useSignInService } from '../services/sign-in.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { Dialog } from '../components/modals/dialog';
import { Loading } from '../components/modals/loading';
import { NavigationParams } from '../types/navigation.params';
import { useNavigation } from '@react-navigation/native';
import { useTokenRenewService } from '../services/token-renew.service';
import { Costumer } from '../models/costumer.model';

type ContextProps = {
    user: User | undefined;
    company: string | undefined;
    costumer: Costumer | undefined;
    token: Token | undefined;
    loading: boolean;
    date: string | undefined;
    handleChangeCompany(_company: string): void;
    handleChangeDate(_title: string): void;
    handleChangeCostumer(_title: Costumer): void;
    signIn(_code: string, _password: string): Promise<void>;
    signOut(): Promise<void>;
    validateToken(): Promise<Token | undefined>;
    startLoading(): void;
    stopLoading(): void;
    showDialog(_message: string): void;
};

const defaultState = {
    user: undefined,
    company: undefined,
    costumer: undefined,
    token: undefined,
    loading: true,
    date: undefined,
    handleChangeCompany: () => { },
    handleChangeDate: () => { },
    handleChangeCostumer: () => { },
    signIn: async () => { },
    signOut: async () => { },
    validateToken: async () => Promise.resolve(undefined),
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
    const [company, setCompany] = useState<string>();
    const [costumer, setCostumer] = useState<Costumer>();
    const [token, setToken] = useState<Token>();
    const [date, setDate] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const defaultDialog = { title: '', content: '', visible: false };
    const error = {
        title: 'Erro',
        content: 'Não foi possível se comunicar com o servidor',
        visible: true,
    };
    const noData = {
        title: 'Nada consta',
        content: 'Nenhum dado foi encontrado para exibir',
        visible: true,
    };
    const invalidCredentials = {
        title: 'Credenciais inválidas',
        content: 'Código do vendedor e/ou senha incorreto(a)s',
        visible: true,
    };
    const [dialog, setDialog] = useState(defaultDialog);
    const signInService = useSignInService();
    const tokenRenewService = useTokenRenewService();

    useEffect(() => {
        const validate = async () => {
            await validateToken();
        };
        if (!user) {
            validate().catch(() => { });
        }
    }, []);

    useEffect(() => {
        if (dialog.visible && navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [dialog]);

    const signIn = async (code: string, password: string) => {
        setLoading(true);
        await signInService
            .signIn(code, password)
            .then(async (_token) => {
                setToken(_token);
                setUser(_decodeToken(_token));
                await _storeToken(_token);
            })
            .catch(() => {
                setDialog(invalidCredentials);
            });
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        setUser(undefined);
        setToken(undefined);
        setDate(undefined);
        await AsyncStorage.clear();
        setLoading(false);
    };

    const handleChangeCompany = (_company: string) => {
        setCompany(_company);
    };

    const handleChangeDate = (_title: string) => {
        setDate(_title);
    };

    const handleChangeCostumer = (_costumer: Costumer) => {
        setCostumer(_costumer);
    };

    const _getToken = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            if (jsonValue) {
                let _token: Token = JSON.parse(jsonValue);
                return _token;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const _storeToken = async (_token: Token) => {
        try {
            const jsonValue = JSON.stringify(_token);
            await AsyncStorage.setItem('@token', jsonValue);
        } catch (error) {
            console.error(error);
        }
    };

    const _decodeToken = (_token: Token) => {
        return jwtDecode<User>(_token.token);
    };

    const validateToken = async () => {
        let token: Token | undefined;
        let isTokenValid = false;
        await _getToken().then(async (_token) => {
            token = _token;
            if (token) {
                let user = _decodeToken(token);
                let expiration = user.exp;
                isTokenValid = expiration * 1000 > Date.now();
                if (isTokenValid) {
                    setUser(user);
                } else {
                    token = await tokenRenewService.renewToken(token);
                    setToken(token);
                    setUser(_decodeToken(token));
                    await _storeToken(token);
                }
            }
        });
        return token;
    };

    const showDialog = async (_message: string) => {
        setLoading(false);
        if (_message == 'error') {
            setDialog(error);
        } else if (_message == 'noData') {
            setDialog(noData);
        } else {
            setDialog({
                title: "Alerta",
                content: _message,
                visible: true
            })
        }

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
            company,
            costumer,
            token,
            loading,
            date,
            handleChangeCompany,
            handleChangeDate,
            handleChangeCostumer,
            signIn,
            signOut,
            validateToken,
            startLoading,
            stopLoading,
            showDialog,
        }),
        [
            user,
            company,
            costumer,
            token,
            loading,
            date,
            handleChangeCompany,
            handleChangeDate,
            handleChangeCostumer,
            signIn,
            signOut,
            validateToken,
            startLoading,
            stopLoading,
            showDialog,
        ],
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
