import { createContext, useEffect, useMemo, useState } from "react"
import { User } from "../models/user.model"
import { Costumer } from "../models/costumer.model"

type ContextProps = {
    user: User | undefined
    costumers: Costumer[] | undefined
    loading: boolean
    signIn(
        _email: string,
        _password: string,
    ): Promise<void>
    signOut(): Promise<void>
}

const defaultState = {
    user: undefined,
    costumers: undefined,
    loading: true,
    signIn: async () => { },
    signOut: async () => { },
}

export const Context = createContext<ContextProps>(defaultState)

type ProviderProps = {
    children?: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<User>();
    const [costumers, setCostumers] = useState<Costumer[]>()
    const [loading, setLoading] = useState<boolean>(true);
    const defaultDialog = { title: "", content: "", visible: false };

    useEffect(() => {
        let _user: User = {
            userCode: "0001",
            sellerCode: "FFF1",
            fullName: "Vendedor Teste",
            role: "Vendedor Pleno"
        }
        setUser(_user)
        let _costumers: Costumer[] = [
            {
                code: "XXT001",
                fullName: "CLIENTE TESTE 1",
                status: "Ativo",
                type: "Carteira",
                value: 100,
                schedule: "08:00",
                arrival: "Chegou",
                phone: "(91) 90000-0000",
                service: "WhatsApp",
                task: "Comissão"
            },
            {
                code: "XXT002",
                fullName: "CLIENTE TESTE 2",
                status: "Inativo",
                type: "Carteira",
                value: 100,
                schedule: "10:00",
                arrival: "Previsto",
                phone: "(91) 90000-0002",
                service: "Normal",
                task: "Comissão"
            }
        ]
        setCostumers(_costumers)
        setLoading(false)
    }, [])

    const signIn = async (
        _email: string,
        _password: string,
    ) => {
        setUser({
            userCode: "",
            sellerCode: "",
            fullName: "",
            role: "",
        })
        console.log(defaultDialog.visible)
    }

    const signOut = async () => {
        setUser(undefined)
    }

    const contextValue = useMemo(
        () => ({
            user,
            costumers,
            loading,
            signIn,
            signOut,
        }),
        [
            user,
            costumers,
            loading,
            signIn,
            signOut,
        ]
    )

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default Provider