import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { BillingModel } from "../models/billing.model";

const resourceURL: string = "/faturamento"

export const useBillingService = () => {
    const get = async (code: string, date: string, token: string): Promise<BillingModel[]> => {
        let _date = date.split("/")
        let yyyy = _date[2]
        let MM = _date[1]
        let dd = _date[0]
        date = `${yyyy}-${MM}-${dd}`
        const response: AxiosResponse<BillingModel[]> = await http(token).get<BillingModel[]>(`${resourceURL}/${code}/${date}`)
        return response.data
    }

    return ({
        get,
    })
}