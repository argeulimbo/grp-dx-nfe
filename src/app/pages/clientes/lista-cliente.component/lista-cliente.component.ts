import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DxButtonComponent, DxDataGridComponent, DxTextBoxComponent } from 'devextreme-angular';


@Component({
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxTextBoxComponent,
    RouterLink],
  selector: 'app-lista-cliente.component',
  styleUrl: './lista-cliente.component.scss',
  templateUrl: './lista-cliente.component.html',
})
export class ListaClienteComponent {

  clientes: any[] = [];

  constructor(
    private http: HttpClient
  ) {

  }


}
