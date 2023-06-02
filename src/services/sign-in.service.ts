import { AxiosResponse } from "axios";
import { http } from "./http.service";

const resourceURL: string = "/login"

export const useSignInService = () => {
    const signIn = async (code: string, password: string): Promise<{ token: string }> => {
        const response: AxiosResponse<{ token: string }> = await http().post<{ token: string }>(resourceURL, { code, password })
        return response.data
    }

    return ({
        signIn,
    })
}