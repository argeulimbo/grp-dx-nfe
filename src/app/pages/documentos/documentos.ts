export interface ItemNotaFiscalRequest {
  codigoProduto?:     number;
  quantidade?:        number;
}

export interface NotaFiscal {
  id?:                number;
  numero?:            string;
  cliente?:     Cliente;
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

export interface Produto {
  id?:              number;
  codigo?:          string;
  descricao?:       string;
  valorUnitario?:   number;
}

export interface ItemNotaGrid {
  descricaoProduto?:  string;
  quantidade?:        number;
  valorUnitario?:     number;
}
