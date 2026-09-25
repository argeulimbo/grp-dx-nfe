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

  buscarPorNumero(numero: string): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.API}/${numero}`);
  }

  criar(nota: NotaFiscal): Observable<string> {
    return this.http.post(this.API, nota, { responseType: 'text' });
  }

  salvar(numeroNotaURL: string, nota: NotaFiscal): Observable<string> {
    return this.http.put(`${this.API}/${numeroNotaURL}`, nota, {
      responseType: 'text'
    });
  }

  excluir(numero: string): Observable<string> {
    const url = `${this.API}/${numero}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
