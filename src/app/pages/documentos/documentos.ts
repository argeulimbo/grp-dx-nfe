export interface Cliente {
  id?: number;
  codigo?: string;
  nome?: string;
}

export interface Produto {
  id?: number;
  codigo?: string;
  descricao?: string;
  valorUnitario?: number;
}

export interface NotaFiscal {
  id?: number;
  numero?: string;
  cliente?: Cliente;
  dataEmissao: Date;
  valorTotal?: number;
  itens?: ItemNotaFiscalRequest[];
}

export interface ItemNotaFiscalRequest {
  codigoProduto?: string;
  quantidade?: number;
  valorUnitario?: number;
}

export interface ItemNotaGrid {
  descricaoProduto?: string;
  quantidade?: number;
  valorUnitario?: number;
}
