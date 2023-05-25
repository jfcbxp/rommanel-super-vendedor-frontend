import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { Meta } from "../models/meta.model";

const resourceURL: string = "/meta"

export const useMetaService = () => {
    const get = async (code: string, token: string): Promise<Meta> => {
        const response: AxiosResponse<Meta> = await http(token).get<Meta>(`${resourceURL}/${code}`)
        return response.data
    }

    return ({
        get,
    })
}