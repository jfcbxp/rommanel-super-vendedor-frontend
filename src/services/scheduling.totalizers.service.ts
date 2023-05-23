import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { SchedulingTotalizer } from "../models/scheduling.totalizer.model";

const resourceURL: string = "/agendamento/totalizador"

export const useSchedulingTotalizerService = () => {
    const getDaily = async (code: string, token: string): Promise<SchedulingTotalizer> => {
        const response: AxiosResponse<SchedulingTotalizer> = await http(token).get<SchedulingTotalizer>(`${resourceURL}/diario/${code}`)
        return response.data
    }

    const getMontly = async (code: string, token: string): Promise<SchedulingTotalizer> => {
        const response: AxiosResponse<SchedulingTotalizer> = await http(token).get<SchedulingTotalizer>(`${resourceURL}/mensal/${code}`)
        return response.data
    }

    return ({
        getDaily,
        getMontly,
    })
}