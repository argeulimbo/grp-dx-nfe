import { Component, OnInit } from '@angular/core';
import { NotaFiscal } from './documentos';

import { DxButtonComponent,
         DxTextBoxComponent,
         DxDataGridComponent
        } from 'devextreme-angular';

@Component({
  imports: [
    DxButtonComponent,
    DxTextBoxComponent,
    DxDataGridComponent
  ],
  selector: 'app-lista-nota-fiscal.component',
  styleUrl: './lista-nota-fiscal.component.scss',
  templateUrl: './lista-nota-fiscal.component.html',
})
export class ListaNotaFiscalComponent {

  notas: NotaFiscal[] = [];

}
