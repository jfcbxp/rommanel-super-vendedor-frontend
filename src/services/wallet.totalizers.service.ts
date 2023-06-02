import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { WalletTotalizer } from "../models/wallet.totalizer.model";

const resourceURL: string = "/carteira/totalizador"

export const useWalletWalletTotalizerService = () => {
    const getActives = async (code: string, token: string): Promise<WalletTotalizer> => {
        const response: AxiosResponse<WalletTotalizer> = await http(token).get<WalletTotalizer>(`${resourceURL}/000001/${code}`)
        return response.data
    }

    const getInactives = async (code: string, token: string): Promise<WalletTotalizer> => {
        const response: AxiosResponse<WalletTotalizer> = await http(token).get<WalletTotalizer>(`${resourceURL}/000002/${code}`)
        return response.data
    }

    return ({
        getActives,
        getInactives,
    })
}