import { useContext } from "react";
import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { WalletTotalizer } from "../models/wallet.totalizer.model";
import { Context } from "../context";

const resourceURL: string = "/carteira/totalizador"

export const useWalletWalletTotalizerService = () => {
    const context = useContext(Context)

    const getActives = async (code: string): Promise<WalletTotalizer> => {
        let auth = await context.validateToken().then(token => { return token })
        const response: AxiosResponse<WalletTotalizer> = await http(auth?.token).get<WalletTotalizer>(`${resourceURL}/000001/${code}`)
        return response.data
    }

    const getInactives = async (code: string): Promise<WalletTotalizer> => {
        let auth = await context.validateToken().then(token => { return token })
        const response: AxiosResponse<WalletTotalizer> = await http(auth?.token).get<WalletTotalizer>(`${resourceURL}/000002/${code}`)
        return response.data
    }

    return ({
        getActives,
        getInactives,
    })
}