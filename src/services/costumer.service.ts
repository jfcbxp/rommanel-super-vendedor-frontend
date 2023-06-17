import { AxiosResponse } from "axios";
import { http } from "./http.service";
import { useContext } from "react";
import { Context } from "../context";
import { Costumer } from "../models/costumer.model";

const resourceURL: string = "/cliente"

export const useCostumerService = () => {
    const context = useContext(Context)

    const get = async (name: string): Promise<Costumer[]> => {
        let auth = await context.validateToken().then(token => { return token })
        const response: AxiosResponse<Costumer[]> = await http(auth?.token).get<Costumer[]>(`${resourceURL}/${name}`)
        return response.data
    }

    return ({
        get,
    })
}