import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxButtonComponent, DxDataGridComponent, DxFormModule, DxSelectBoxComponent } from 'devextreme-angular';
import { DxiColumnComponent, DxoDropDownOptionsComponent, DxoEditingComponent, DxoLookupComponent } from 'devextreme-angular/ui/nested';
import { DxiToolbarItemComponent } from 'devextreme-angular/ui/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    DxFormModule,
    DxSelectBoxComponent,
    DxoDropDownOptionsComponent,
    DxiToolbarItemComponent,
    DxDataGridComponent,
    DxoEditingComponent,
    DxiColumnComponent,
    DxoLookupComponent,
    DxButtonComponent,
    RouterLink,
  ],
  selector: 'app-criar-nota-fiscal',
  styleUrl: './criar-nota-fiscal.scss',
  templateUrl: './criar-nota-fiscal.html',
})
export class CriarNotaFiscalComponent implements OnInit {
  nota: any = {
    numero: null,
    codigoCliente: null,
    dataEmissao: new Date(),
    valorTotal: 0,
    itens: [],
  };

  clientes: any[] = [];
  produtos: any[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  btnNovoClienteOptions = {
    text: '+ Cadastrar Novo Cliente',
    type: 'default',
    onClick: () => this.abrirModalOuNavegarCriarCliente(),
  };

  // GET all clientes
  carregarClientes() {
    return null;
  }

  // GET all produtos
  carregarProdutos() {
    return null;
  }

  abrirModalOuNavegarCriarCliente() {
    return null;
  }

  atualizarValorTotal() {
    return null;
  }

  salvarNota() {
    return null;
  }
}
