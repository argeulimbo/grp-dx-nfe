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

  buscarPorCodigo(codigo: string): Observable<Cliente> {
    const url = `${this.API}/${codigo}`;
    return this.http.get<Cliente>(url);
  }

  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
    alert('Cliente ' + cliente.nome + ' criado com sucesso!');
  }

  // Editar Atualizado para lidar com response em text do BackEnd
  editarCliente(cliente: Cliente): Observable<string> {
    const url = `${this.API}/${cliente.codigo}`;
    return this.http.put(url, cliente, { responseType: 'text' });
  }

  // Assinatura: mudar de void para Observable<void>
  // Corpo do metodo: adicionar return this.http...
  excluir(codigo: string): Observable<void> {
    const url = `${this.API}/${codigo}`;
    return this.http.delete<void>(url);
  }
}
