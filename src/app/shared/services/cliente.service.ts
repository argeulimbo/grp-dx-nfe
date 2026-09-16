import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../pages/documentos/documentos';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  /*
  @Depreciado - Usar somente se o CORS não barrar REQUEST
  private readonly API = 'http://localhost:8080/clientes';
  */

  private readonly API = '/api/clientes';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  // Não utilizado até o momento
  // Codigo ou Nome - Cliente
  buscarPorNomeOuCodigo(nomeOuCodigo: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${nomeOuCodigo}`);
  }

  // POST method - Create
  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
    alert('Cliente ' + cliente.nome + ' criado com sucesso!');
  }

  // PUT method - Update
  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.API}/${cliente.codigo}`,
      cliente
    );
  }

  // DELETE method - Delete
  // Assinatura: mudar de void para Observable<void>
  // Corpo do método: adicionar return this.http...
  excluir(codigo: string): void {
    this.http.delete(`${this.API}/${codigo}`);
    alert('Cliente excluído com sucesso, número: ' + codigo);
  }
}
