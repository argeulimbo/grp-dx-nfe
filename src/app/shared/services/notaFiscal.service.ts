import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaFiscal } from '../../pages/documentos/documentos';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService<T> {

  // Endpoint NOTAS
  private readonly API = 'http://localhost:8080/notas';

  constructor(private http: HttpClient) { }

  listar(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.API);
  }

  buscarPorNumero(numero: number): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.API}/${numero}`);
  }

  salvar(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.API, nota);
  }

  // Assinatura: mudar de void para Observable<void>
  // Corpo do método: adicionar return this.http...
  excluir(numero: number): void {
    this.http.delete(`${this.API}/${numero}`);
    alert('Nota Fiscal excluída com sucesso, número: ' + numero);
  }


}
