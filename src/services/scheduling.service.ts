import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { Schedule } from "../models/schedule.model";

const resourceURL: string = "/agendamento"

export const useSchedulingService = () => {
    const get = async (code: string, token: string): Promise<Schedule[]> => {
        const response: AxiosResponse<Schedule[]> = await http(token).get<Schedule[]>(`${resourceURL}/${code}`)
        return response.data
    }

    return ({
        get,
    })
}