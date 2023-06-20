import { AxiosResponse } from 'axios';
import { http } from './http.service';
import { SchedulingTotalizer } from '../models/scheduling.totalizer.model';
import { useContext } from 'react';
import { Context } from '../context';

const resourceURL: string = '/agendamento/totalizador';

export const useSchedulingTotalizerService = () => {
    const context = useContext(Context);

    const getDaily = async (code: string): Promise<SchedulingTotalizer> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        const response: AxiosResponse<SchedulingTotalizer> = await http(auth?.token).get<SchedulingTotalizer>(
            `${resourceURL}/diario/${code}`,
        );
        return response.data;
    };

    const getMontly = async (code: string): Promise<SchedulingTotalizer> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        const response: AxiosResponse<SchedulingTotalizer> = await http(auth?.token).get<SchedulingTotalizer>(
            `${resourceURL}/mensal/${code}`,
        );
        return response.data;
    };

    return {
        getDaily,
        getMontly,
    };
};
