import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto } from '../../pages/documentos/documentos';

@Injectable( { providedIn: 'root' } )
export class ProdutoService {

  /*
  @Depreciado - Utilizar em caso de NÃO usar Proxy Conf
  private readonly API = 'http://localhost:8000/produtos';
  */

  private readonly API = '/api/produtos';

  constructor(
    private http: HttpClient
  ) { }

  // GET
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  // POST
  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  // PUT
  salvar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.API}/${produto.codigo}`,
      produto
    );
  }

  // Delete
  excluir(codigo: string): void {
    this.http.delete(`${this.API}/${codigo}`);
  }
}
