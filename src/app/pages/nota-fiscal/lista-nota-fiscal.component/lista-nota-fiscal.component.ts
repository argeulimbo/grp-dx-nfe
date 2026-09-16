import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit } from '@angular/core';

import { DxButtonComponent,
         DxTextBoxComponent,
         DxDataGridComponent, DxTemplateDirective
} from 'devextreme-angular';
import { Cliente, NotaFiscal } from '../../documentos/documentos';

import { Router, RouterLink } from '@angular/router';
import {NotaFiscalService} from '../../../shared/services/notaFiscal.service';
import { DxiColumnComponent, DxiItemComponent } from 'devextreme-angular/ui/nested';

@Component({
  imports: [
    DxButtonComponent,
    DxTextBoxComponent,
    DxDataGridComponent,
    RouterLink,
    DxiColumnComponent,
    DxTemplateDirective,
  ],
  selector: 'app-lista-nota-fiscal.component',
  styleUrl: './lista-nota-fiscal.component.scss',
  templateUrl: './lista-nota-fiscal.component.html',
})
export class ListaNotaFiscalComponent implements OnInit {
  notas: NotaFiscal[] = [];

  filtroPorTexto: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private notaFiscalService: NotaFiscalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listarNotas();
  }

  filtrarPorTexto(): NotaFiscal[] {
    if (!this.filtroPorTexto) {
      return this.notas;
    }
    return this.notas.filter((nota) => {
      return nota.numero?.toLowerCase().includes(this.filtroPorTexto.toLowerCase());
    });
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  listarNotas(): void {
    this.notaFiscalService.listar().subscribe((listaNotas) => {
      this.notas = listaNotas;
      this.changeDetectorRef.detectChanges();
    });
  }

  editarNota(codigo: string): void {
    this.router.navigate(['/nfe/notas', codigo]);
  }

  excluirNota(codigo: string) {
    return null;
  }
}
