export interface ItemNotaFiscalRequest {
  codigoProduto?:     number;
  quantidade?:        number;
}

export interface NotaFiscal {
  id?:                number;
  numero?:            string;
  codigoCliente?:     string;
  dataEmissao:          Date;
  itens?: ItemNotaFiscalRequest[];
}

export interface Cliente {
  id?:                number;
  codigo?:            string;
  nome?:              string;
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
