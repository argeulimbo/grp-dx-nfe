export interface ItemNotaFiscalRequest {
  codigoProduto?:     number;
  quantidade?:        number;
}

export interface NotaFiscal {
  id?:                number;
  numero?:            string;
  codigoCliente?:     string;
  itens?: ItemNotaFiscalRequest[];
}

export interface ItemNotaFiscal {
  notaFiscal?:
    {
      numero?: string
    };
  produto?:
    {
      codigo?: number
    };
  quantidade?: number;
}
