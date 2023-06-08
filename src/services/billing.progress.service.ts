import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { BillingProgress } from "../models/billing.progress.model";
import { useContext } from "react";
import { Context } from "../context";

const resourceURL: string = "/faturamento/progresso"

export const useBillingProgressService = () => {
    const context = useContext(Context)

    const get = async (code: string): Promise<BillingProgress[]> => {
        let auth = await context.validateToken().then(token => { return token })
        const response: AxiosResponse<BillingProgress[]> = await http(auth?.token).get<BillingProgress[]>(`${resourceURL}/${code}`)
        return response.data
    }

    return ({
        get,
    })
}