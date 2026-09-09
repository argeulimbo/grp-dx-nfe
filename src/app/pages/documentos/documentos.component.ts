import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxDataGridComponent, DxButtonComponent, DxTextBoxComponent } from 'devextreme-angular';

import { NotaFiscal } from './documentos';

@Component({
  imports: [
    DxDataGridComponent,
    DxButtonComponent,
    DxTextBoxComponent
],
  selector: 'app-documentos.component',
  styleUrl: './documentos.component.scss',
  templateUrl: './documentos.component.html',
})
export class DocumentosComponent implements OnInit {

  documentos: NotaFiscal[] = [];

  filtroPorNumero: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

}
