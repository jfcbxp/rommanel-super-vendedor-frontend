import { createContext, useEffect, useMemo, useState } from "react"
import { User } from "../models/user.model"

type ContextProps = {
    user: User | undefined
    loading: boolean
    signIn(
        _email: string,
        _password: string,
    ): Promise<void>
    signOut(): Promise<void>
}

const defaultState = {
    user: undefined,
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
    const [loading, setLoading] = useState<boolean>(true);
    const defaultDialog = { title: "", content: "", visible: false };

    useEffect(() => {
        setLoading(false)
    }, [])

    const signIn = async (
        _email: string,
        _password: string,
    ) => {

    }

    const signOut = async () => {

    }

    const contextValue = useMemo(
        () => ({
            user,
            loading,
            signIn,
            signOut,
        }),
        [
            user,
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