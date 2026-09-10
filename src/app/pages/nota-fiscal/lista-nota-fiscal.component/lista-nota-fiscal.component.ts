import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxButtonComponent,
         DxTextBoxComponent,
         DxDataGridComponent
        } from 'devextreme-angular';
import { NotaFiscal } from '../../documentos/documentos';
import { NotaFiscalService } from '../../../shared/services/notaFiscal.service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [
    DxButtonComponent,
    DxTextBoxComponent,
    DxDataGridComponent,
    RouterLink
],
  selector: 'app-lista-nota-fiscal.component',
  styleUrl: './lista-nota-fiscal.component.scss',
  templateUrl: './lista-nota-fiscal.component.html',
})
export class ListaNotaFiscalComponent implements OnInit {

  notas: NotaFiscal[] = [];

  filtroPorTexto: string = '';

  constructor(
    private notaFiscalService: NotaFiscalService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.notaFiscalService.listar().subscribe(listaNotas => {
      this.notas = listaNotas;
      this.changeDetectorRef.detectChanges();
    });
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarPorTexto(): NotaFiscal[] {
    if (!this.filtroPorTexto) {
      return this.notas
    }
    return this.notas.filter(nota => { 
      return nota.numero?.toLowerCase().includes(this.filtroPorTexto.toLowerCase());
    })
  }
}
