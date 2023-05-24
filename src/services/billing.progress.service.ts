import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { BillingProgress } from "../models/billing.progress.model";

const resourceURL: string = "/faturamento/progresso"

export const useBillingProgressService = () => {
    const get = async (code: string, token: string): Promise<BillingProgress[]> => {
        const response: AxiosResponse<BillingProgress[]> = await http(token).get<BillingProgress[]>(`${resourceURL}/${code}`)
        return response.data
    }

    return ({
        get,
    })
}