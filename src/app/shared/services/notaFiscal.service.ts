import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaFiscal } from '../../pages/documentos/documentos';

@Injectable({
  providedIn: 'root',
})
export class NotaFiscalService {
  /*
  @Depreciado - Usar somente se o CORS não barrar REQUEST
  private readonly API = 'http://localhost:8080/notas';
  */

  private readonly API = '/api/notas';

  constructor(private http: HttpClient) {}

  listar(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.API);
  }

  // Não utilizado até o momento
  // Numero da Nota
  buscarPorNumero(numero: string): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.API}/${numero}`);
  }

  // POST method - Create
  criar(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.API, nota);
  }

  // PUT method - Update
  salvar(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.put<NotaFiscal>(
      `${this.API}/${nota.numero}`,
      nota);
  }

  // DELETE method - Delete
  // Assinatura: mudar de void para Observable<void>
  // Corpo do método: adicionar return this.http...
  excluir(numero: string): void {
    this.http.delete(`${this.API}/${numero}`);
  }
}
