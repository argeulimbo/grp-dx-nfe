import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxButtonComponent,
         DxTextBoxComponent,
         DxDataGridComponent, DxTemplateDirective
} from 'devextreme-angular';
import { NotaFiscal } from '../../documentos/documentos';

import { RouterLink } from '@angular/router';
import { NotaFiscalService } from '../../../shared/services/notaFiscal.service';
import { DxiColumnComponent } from 'devextreme-angular/ui/nested';

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

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private notaFiscalService: NotaFiscalService,
  ) {}

  ngOnInit(): void {
    this.listarNotas();
  }

  listarNotas(): void {
    this.notaFiscalService.listar().subscribe((listaNotas) => {
      this.notas = listaNotas;
      this.changeDetectorRef.detectChanges();
    });
  }

  excluirNota(numero: string): void {
    if(confirm('Deseja excluir este registro? ')) {
      this.notaFiscalService.excluir(numero).subscribe( (nota) => {
        this.listarNotas();
        // Trocar o alert
        // alert(nota);
      })
    }
  }
}
