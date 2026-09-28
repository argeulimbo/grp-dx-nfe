import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto } from '../../pages/documentos/documentos';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  /*
  @Depreciado - Utilizar em caso de NÃO usar Proxy Conf
  private readonly API = 'http://localhost:8000/produtos';
  */

  private readonly API = '/api/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  buscarPorCodigo(codigo: string): Observable<Produto> {
    const url = `${this.API}/${codigo}`;
    return this.http.get<Produto>(url);
  }

  criar(produto: Produto): Observable<string> {
    return this.http.post(this.API, produto, { responseType: 'text' });
  }

  editarProduto(codigoProdutoURL: string, produto: Produto): Observable<string> {
    return this.http.put(`${this.API}/${codigoProdutoURL}`, produto, {
      responseType: 'text'
    });
  }

  excluir(codigo: string): Observable<string> {
    const url = `${this.API}/${codigo}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
