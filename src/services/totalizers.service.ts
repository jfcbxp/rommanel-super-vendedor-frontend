import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { Totalizer } from "../models/totalizer.model";

const resourceURL: string = "/agendamento/totalizador"

export const useTotalizerService = () => {
    const getDaily = async (code: string, token: string): Promise<Totalizer> => {
        const response: AxiosResponse<Totalizer> = await http(token).get<Totalizer>(`${resourceURL}/diario/${code}`)
        return response.data
    }

    const getMontly = async (code: string, token: string): Promise<Totalizer> => {
        const response: AxiosResponse<Totalizer> = await http(token).get<Totalizer>(`${resourceURL}/mensal/${code}`)
        return response.data
    }

    return ({
        getDaily,
        getMontly,
    })
}