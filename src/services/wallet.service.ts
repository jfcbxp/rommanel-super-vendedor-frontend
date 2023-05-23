import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { Wallet } from "../models/wallet.model";

const resourceURL: string = "/carteira"

export const useWalletService = () => {
    const get = async (code: string, token: string): Promise<Wallet[]> => {
        const response: AxiosResponse<Wallet[]> = await http(token).get<Wallet[]>(`${resourceURL}/000001/${code}`)
        return response.data
    }

    return ({
        get,
    })
}