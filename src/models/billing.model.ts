export interface BillingModel {
    id: number
    orcamento: string
    empresa: string
    tipoOrcamento: string
    emissao: string
    codigoVendedor: string
    codigoCliente: string
    lojaCliente: string
    nomeCliente: string
    observacao: string
    serie: string
    telefone: string
    total: number
    frete: number
    valorRA: number
    valorNCC: number
    formaPagamento: string
}