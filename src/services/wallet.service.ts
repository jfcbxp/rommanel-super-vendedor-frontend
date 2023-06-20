import { AxiosResponse } from 'axios';
import { http } from './http.service';
import { Wallet } from '../models/wallet.model';
import { useContext } from 'react';
import { Context } from '../context';

const resourceURL: string = '/carteira';

export const useWalletService = () => {
    const context = useContext(Context);

    const get = async (code: string): Promise<Wallet[]> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        const response: AxiosResponse<Wallet[]> = await http(auth?.token).get<Wallet[]>(
            `${resourceURL}/000001/${code}`,
        );
        return response.data;
    };

    return {
        get,
    };
};
