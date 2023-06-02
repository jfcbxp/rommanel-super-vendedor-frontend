import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { Schedule } from "../models/schedule.model";
import { useContext } from "react";
import { Context } from "../context";

const resourceURL: string = "/agendamento"

export const useSchedulingService = () => {
    const context = useContext(Context)

    const get = async (code: string): Promise<Schedule[]> => {
        let auth = await context.validateToken().then(token => { return token })
        const response: AxiosResponse<Schedule[]> = await http(auth?.token).get<Schedule[]>(`${resourceURL}/${code}`)
        return response.data
    }

    return ({
        get,
    })
}