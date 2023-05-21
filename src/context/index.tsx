import { createContext, useEffect, useMemo, useState } from "react"
import { User } from "../models/user.model"
import { useSchedulingService } from "../services/scheduling.service"
import { Schedule } from "../models/schedule.model"
import { useSignInService } from "../services/sign-in.service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode"
import { Dialog } from "../components/modals/dialog"
import { Totalizer } from "../models/totalizer.model"
import { useTotalizerService } from "../services/totalizers.service"
import { Loading } from "../components/modals/loading"

type ContextProps = {
    user: User | undefined
    token: string | undefined
    dailyTotalizer: Totalizer | undefined
    monthlyTotalizer: Totalizer | undefined
    schedules: Schedule[] | undefined
    loading: boolean
    getSchedules(): Promise<void>
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
    loading: true,
    getSchedules: async () => { },
    signIn: async () => { },
    signOut: async () => { },
}

export const Context = createContext<ContextProps>(defaultState)

type ProviderProps = {
    children?: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string>();
    const [dailyTotalizer, setDailyTotalizer] = useState<Totalizer>()
    const [monthlyTotalizer, setMonthlyTotalizer] = useState<Totalizer>()
    const [schedules, setSchedules] = useState<Schedule[]>()
    const [loading, setLoading] = useState<boolean>(true);
    const defaultDialog = { title: "", content: "", visible: false };
    const [dialog, setDialog] = useState(defaultDialog);
    const signInService = useSignInService()
    const schedulingService = useSchedulingService()
    const totalizerService = useTotalizerService()

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
            await _getTotalizers()
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

    const _getTotalizers = async () => {
        setLoading(true)
        if (_isUserAuthenticated() && token) {
            await totalizerService.getDaily(user?.sub!, token)
                .then(_dailyTotalizer => {
                    setDailyTotalizer(_dailyTotalizer)
                })
            await totalizerService.getMontly(user?.sub!, token)
                .then(_monthlyTotalizer => {
                    setMonthlyTotalizer(_monthlyTotalizer)
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
            loading,
            getSchedules,
            signIn,
            signOut,
        }),
        [
            user,
            token,
            dailyTotalizer,
            monthlyTotalizer,
            schedules,
            loading,
            getSchedules,
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