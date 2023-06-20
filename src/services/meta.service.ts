import { AxiosResponse } from 'axios';
import { http } from './http.service';
import { Meta } from '../models/meta.model';
import { useContext } from 'react';
import { Context } from '../context';

const resourceURL: string = '/meta';

export const useMetaService = () => {
    const context = useContext(Context);

    const get = async (code: string): Promise<Meta> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        const response: AxiosResponse<Meta> = await http(auth?.token).get<Meta>(`${resourceURL}/${code}`);
        return response.data;
    };

    return {
        get,
    };
};
