import { createContext, useEffect, useMemo, useState } from "react"
import { User } from "../models/user.model"
import { useSchedulingService } from "../services/scheduling.service"
import { Schedule } from "../models/schedule.model"
import { useSignInService } from "../services/sign-in.service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode"
import { Dialog } from "../components/modals/dialog"
import { SchedulingTotalizer } from "../models/scheduling.totalizer.model"
import { useSchedulingTotalizerService } from "../services/scheduling.totalizers.service"
import { Loading } from "../components/modals/loading"
import { WalletTotalizer } from "../models/wallet.totalizer.model"
import { useWalletWalletTotalizerService } from "../services/wallet.totalizers.service"
import { Wallet } from "../models/wallet.model"
import { useWalletService } from "../services/wallet.service"

type ContextProps = {
    user: User | undefined
    token: string | undefined
    dailyTotalizer: SchedulingTotalizer | undefined
    monthlyTotalizer: SchedulingTotalizer | undefined
    schedules: Schedule[] | undefined
    activesTotalizer: WalletTotalizer | undefined
    inactivesTotalizer: WalletTotalizer | undefined
    wallets: Wallet[] | undefined
    loading: boolean
    getSchedules(): Promise<void>
    getWallets(): Promise<void>
    signIn(
        _code: string,
        _password: string,
    ): Promise<void>
    signOut(): Promise<void>
}

const defaultState = {
    user: undefined,
    token: undefined,
    dailyTotalizer: undefined,
    monthlyTotalizer: undefined,
    schedules: undefined,
    activesTotalizer: undefined,
    inactivesTotalizer: undefined,
    wallets: undefined,
    loading: true,
    getSchedules: async () => { },
    getWallets: async () => { },
    signIn: async () => { },
    signOut: async () => { },
}

export const Context = createContext<ContextProps>(defaultState)

type ProviderProps = {
    children?: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<User>()
    const [token, setToken] = useState<string>()
    const [dailyTotalizer, setDailyTotalizer] = useState<SchedulingTotalizer>()
    const [monthlyTotalizer, setMonthlyTotalizer] = useState<SchedulingTotalizer>()
    const [schedules, setSchedules] = useState<Schedule[]>()
    const [activesTotalizer, setActivesTotalizer] = useState<WalletTotalizer>()
    const [inactivesTotalizer, setInactivesTotalizer] = useState<WalletTotalizer>()
    const [wallets, setWallets] = useState<Wallet[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const defaultDialog = { title: "", content: "", visible: false }
    const [dialog, setDialog] = useState(defaultDialog)
    const signInService = useSignInService()
    const schedulingService = useSchedulingService()
    const schedulingTotalizerService = useSchedulingTotalizerService()
    const walletService = useWalletService()
    const walletTotalizerService = useWalletWalletTotalizerService()

    useEffect(() => {
        const getFromStorage = async () => {
            await _getUser()
            await _getToken()
        }
        getFromStorage().catch(error => console.error(error))
        setLoading(false)
    }, [])

    const signIn = async (
        code: string,
        password: string,
    ) => {
        setLoading(true)
        await signInService.signIn(code, password)
            .then(async result => {
                setToken(result.token)
                await _storeToken(result.token)
                setUser(_decodeToken(result.token))
                await _storeUser(_decodeToken(result.token))
            })
            .catch(() => {
                setDialog({
                    title: "Credenciais inválidas",
                    content: "Código do vendedor e/ou senha incorreto(a)s",
                    visible: true
                })
            })
        setLoading(false)
    }

    const signOut = async () => {
        setLoading(true)
        setUser(undefined)
        AsyncStorage.clear()
        setLoading(false)
    }

    const getSchedules = async () => {
        setLoading(true)
        if (_isUserAuthenticated() && token) {
            await schedulingService.get(user?.sub!, token)
                .then(schedules => {
                    setSchedules(schedules)
                })
            await _getSchedulingTotalizers()
        } else {
            await signOut()
            setDialog({
                title: "Sessão expirada",
                content: "Efetue acesso novamente",
                visible: true
            })
        }
        setLoading(false)
    }

    const _getSchedulingTotalizers = async () => {
        setLoading(true)
        if (_isUserAuthenticated() && token) {
            await schedulingTotalizerService.getDaily(user?.sub!, token)
                .then(_dailyTotalizer => {
                    setDailyTotalizer(_dailyTotalizer)
                })
            await schedulingTotalizerService.getMontly(user?.sub!, token)
                .then(_monthlyTotalizer => {
                    setMonthlyTotalizer(_monthlyTotalizer)
                })
        }
        setLoading(false)
    }

    const getWallets = async () => {
        setLoading(true)
        if (_isUserAuthenticated() && token) {
            await walletService.get(user?.sub!, token)
                .then(_wallets => {
                    setWallets(_wallets)
                })
            await _getWalletTotalizers()
        } else {
            await signOut()
            setDialog({
                title: "Sessão expirada",
                content: "Efetue acesso novamente",
                visible: true
            })
        }
        setLoading(false)
    }

    const _getWalletTotalizers = async () => {
        setLoading(true)
        if (_isUserAuthenticated() && token) {
            await walletTotalizerService.getActives(user?.sub!, token)
                .then(_activeTotalizer => {
                    setActivesTotalizer(_activeTotalizer)
                })
            await walletTotalizerService.getInactives(user?.sub!, token)
                .then(_inactiveTotalizer => {
                    setInactivesTotalizer(_inactiveTotalizer)
                })
        }
        setLoading(false)
    }

    const _getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@user")
            if (jsonValue) {
                let _user: User = JSON.parse(jsonValue)
                setUser(_user)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const _storeUser = async (_user: User) => {
        try {
            const jsonValue = JSON.stringify(_user)
            await AsyncStorage.setItem("@user", jsonValue)
        } catch (error) {
            console.error(error)
        }
    }

    const _getToken = async () => {
        try {
            const value = await AsyncStorage.getItem("@token")
            if (value) {
                setToken(value)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const _storeToken = async (_token: string) => {
        try {
            await AsyncStorage.setItem("@token", _token)
        } catch (error) {
            console.error(error)
        }
    }

    const _decodeToken = (_token: string) => {
        return jwtDecode<User>(_token)
    }

    const _isUserAuthenticated = () => {
        let isTokenValid = false
        if (token && user) {
            const expiration = user.exp
            isTokenValid = (expiration * 1000) > Date.now()
        }
        return isTokenValid
    }

    const contextValue = useMemo(
        () => ({
            user,
            token,
            dailyTotalizer,
            monthlyTotalizer,
            schedules,
            activesTotalizer,
            inactivesTotalizer,
            wallets,
            loading,
            getSchedules,
            getWallets,
            signIn,
            signOut,
        }),
        [
            user,
            token,
            dailyTotalizer,
            monthlyTotalizer,
            schedules,
            activesTotalizer,
            inactivesTotalizer,
            wallets,
            loading,
            getSchedules,
            getWallets,
            signIn,
            signOut,
        ]
    )

    return (
        <Context.Provider value={contextValue}>
            <Dialog
                title={dialog.title}
                content={dialog.content}
                visible={dialog.visible}
                dismiss={() => {
                    setDialog(defaultDialog);
                }} />
            <Loading visible={loading} />
            {children}
        </Context.Provider>
    )
}

export default Provider