import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxButtonComponent,
         DxTextBoxComponent,
         DxDataGridComponent
        } from 'devextreme-angular';
import { Cliente, NotaFiscal } from '../../documentos/documentos';

import { RouterLink } from "@angular/router";
import {NotaFiscalService} from '../../../shared/services/notaFiscal.service';
import { DxiColumnComponent } from 'devextreme-angular/ui/nested';

@Component({
  imports: [
    DxButtonComponent,
    DxTextBoxComponent,
    DxDataGridComponent,
    RouterLink,
    DxiColumnComponent,
  ],
  selector: 'app-lista-nota-fiscal.component',
  styleUrl: './lista-nota-fiscal.component.scss',
  templateUrl: './lista-nota-fiscal.component.html',
})
export class ListaNotaFiscalComponent implements OnInit {
  notas: NotaFiscal[] = [];

  argeu: Cliente = {
    id: 1,
    codigo: 'A01',
    nome: 'Argeu Phelipe',
  };

  filtroPorTexto: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private notaFiscalService: NotaFiscalService,
  ) {}

  ngOnInit(): void {
    this.notaFiscalService.listar().subscribe((listaNotas) => {
      this.notas = listaNotas;
    });
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarPorTexto(): NotaFiscal[] {
    if (!this.filtroPorTexto) {
      return this.notas;
    }
    return this.notas.filter((nota) => {
      return nota.numero?.toLowerCase().includes(this.filtroPorTexto.toLowerCase());
    });
  }
}
