import { AxiosResponse } from 'axios';
import { http } from './http.service';
import { Token } from '../models/token.model';

const resourceURL: string = '/update';

export const useTokenRenewService = () => {
    const renewToken = async (token: Token): Promise<Token> => {
        const response: AxiosResponse<Token> = await http().post<Token>(resourceURL, token);
        return response.data;
    };

    return {
        renewToken,
    };
};
