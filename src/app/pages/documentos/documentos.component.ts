import { Component, OnInit } from '@angular/core';
import { DxDataGridComponent, DxButtonComponent } from 'devextreme-angular';

@Component({
  imports: [
    DxDataGridComponent,
    DxButtonComponent
],
  selector: 'app-documentos.component',
  styleUrl: './documentos.component.scss',
  templateUrl: './documentos.component.html',
})
export class DocumentosComponent {

  constructor() {

  }

  createDocumento() {
    console.log('Dx-Button NOVO acionado')
  }



}
