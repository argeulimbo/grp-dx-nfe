import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaFiscal } from '../../pages/documentos/documentos';

@Injectable({
  providedIn: 'root',
})
export class NotaFiscalService {

  /*
  @Depreciado - Utilizar em caso de NÃO usar Proxy Conf
  private readonly API = 'http://localhost:8080/notas';
  */

  private readonly API = '/api/notas';

  constructor(private http: HttpClient) {}

  listar(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.API);
  }

  // Não utilizado até o momento
  buscarPorNumero(numero: number): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.API}/${numero}`);
  }

  criar(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.API, nota);
  }

  salvar(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.put<NotaFiscal>(
      `${this.API}/${nota.numero}`,
      nota
    );
  }

  // Assinatura: mudar de void para Observable<void>
  // Corpo do método: adicionar return this.http...
  excluir(numero: number): void {
    this.http.delete(`${this.API}/${numero}`);
    alert('Nota Fiscal excluída com sucesso, número: ' + numero);
  }
}
