import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { Billing } from "../models/billing.model";

const resourceURL: string = "/faturamento"

export const useBillingService = () => {
    const get = async (code: string, date: string, token: string): Promise<Billing> => {
        const response: AxiosResponse<Billing> = await http(token).get<Billing>(`${resourceURL}/${code}`)
        return response.data
    }

    return ({
        get,
    })
}