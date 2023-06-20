export interface Schedule {
    id: number;
    empresa: string;
    situacao: string;
    dataAgendamento: string;
    codigoVendedor: string;
    codigoCliente: string;
    lojaCliente: string;
    nomeCliente: string;
    valor: number;
    observacao: string;
    telefone: string;
    horaInicial: string;
    horaFinal: string;
}
