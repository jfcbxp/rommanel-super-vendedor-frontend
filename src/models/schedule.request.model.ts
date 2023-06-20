export interface ScheduleRequest {
    empresa: string;
    codigoVendedor: string;
    dataAgendamento: string;
    codigoCliente: string;
    lojaCliente: string;
    nomeCliente: string;
    valor: number;
    observacao: string;
    horaInicial: string;
    horaFinal: string;
}
