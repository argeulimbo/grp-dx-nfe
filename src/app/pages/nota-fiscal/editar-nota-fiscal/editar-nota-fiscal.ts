import { Component } from '@angular/core';
import {DxButtonComponent, DxDataGridComponent, DxFormComponent, DxSelectBoxComponent, DxTemplateDirective} from "devextreme-angular";
import {DxiColumnComponent, DxiItemComponent, DxoDropDownOptionsComponent, DxoEditingComponent, DxoLabelComponent,
    DxoLookupComponent
} from "devextreme-angular/ui/nested";
import {DxiToolbarItemComponent} from "devextreme-angular/ui/toolbar";
import {RouterLink} from "@angular/router";

@Component({
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxFormComponent,
    DxSelectBoxComponent,
    DxTemplateDirective,
    DxiColumnComponent,
    DxiItemComponent,
    DxiToolbarItemComponent,
    DxoDropDownOptionsComponent,
    DxoEditingComponent,
    DxoLabelComponent,
    DxoLookupComponent,
    RouterLink,
  ],
  selector: 'app-editar-nota-fiscal',
  styleUrl: './editar-nota-fiscal.scss',
  templateUrl: './editar-nota-fiscal.html',
})
export class EditarNotaFiscalComponent {

  nota: any = null;
  clientes: any = [];
  produtos: any = [];

  atualizarValorTotal() {
    return null;
  }

  editarNota(nota: any) {
    return null;
  }

}
