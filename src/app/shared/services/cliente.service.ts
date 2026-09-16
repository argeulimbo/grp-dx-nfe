import { Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../pages/documentos/documentos';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  /*
  @Depreciado - Utilizar em caso de NÃO usar Proxy Conf
  private readonly API = 'http://localhost:8080/clientes';
  */

  private readonly API = '/api/clientes';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  // Codigo ou Nome - Cliente
  buscarPorNomeOuCodigo(nomeOuCodigo: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${nomeOuCodigo}`);
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  // Assinatura: mudar de void para Observable<void>
  // Corpo do método: adicionar return this.http...
  excluir(codigo: string): void {
    this.http.delete(`${this.API}/${codigo}`);
    alert('Cliente excluído com sucesso, número: ' + codigo);
  }

}
