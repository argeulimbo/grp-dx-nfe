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

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  editarProduto(produto: Produto): Observable<string> {
    return this.http.put(`${this.API}/${produto.codigo}`, produto, {
      responseType: 'text'
    });
  }

  excluir(codigo: string): void {
    this.http.delete(`${this.API}/${codigo}`);
  }

  buscarPorCodigo(codigo: string): Observable<Produto> {
    const url = `${this.API}/${codigo}`;
    return this.http.get<Produto>(url);
  }
}
