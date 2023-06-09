import { AxiosResponse } from 'axios';
import { http } from './http.service';
import { Schedule } from '../models/schedule.model';
import { useContext } from 'react';
import { Context } from '../context';
import { ScheduleResponse } from '../models/schedule.response.model';
import { ScheduleRequest } from '../models/schedule.request.model';

const resourceURL: string = '/agendamento';

export const useSchedulingService = () => {
    const context = useContext(Context);

    const get = async (code: string): Promise<Schedule[]> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        const response: AxiosResponse<Schedule[]> = await http(auth?.token).get<Schedule[]>(`${resourceURL}/${code}`);
        return response.data;
    };

    const put = async (scheduleResponse: ScheduleResponse): Promise<void> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        await http(auth?.token).put<ScheduleResponse>(resourceURL, scheduleResponse);
    };

    const post = async (scheduleRequest: ScheduleRequest): Promise<void> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        await http(auth?.token).post<ScheduleResponse>(resourceURL, scheduleRequest);
    };

    const remove = async (code: string, id: number): Promise<void> => {
        let auth = await context.validateToken().then((token) => {
            return token;
        });
        await http(auth?.token).delete<Schedule>(`${resourceURL}/${code}/${id}`);
    };

    return {
        get,
        put,
        post,
        remove,
    };
};
