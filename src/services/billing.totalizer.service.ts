import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { DailyTotalizer } from "../models/daily.totalizer.model";
import { useContext } from "react";
import { Context } from "../context";

const resourceURL: string = "/faturamento/totalizador/diario"

export const useBillingDailyTotalizer = () => {
    const context = useContext(Context)

    const get = async (code: string, date: string): Promise<DailyTotalizer> => {
        let auth = await context.validateToken().then(token => { return token })
        let _date = date.split("/")
        let yyyy = _date[2]
        let MM = _date[1]
        let dd = _date[0]
        date = `${yyyy}-${MM}-${dd}`
        const response: AxiosResponse<DailyTotalizer> = await http(auth?.token).get<DailyTotalizer>(`${resourceURL}/${code}/${date}`)
        return response.data
    }

    return ({
        get,
    })
}