import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxButtonComponent, DxDataGridComponent, DxFormModule, DxSelectBoxComponent } from 'devextreme-angular';
import { DxiColumnComponent, DxoDropDownOptionsComponent, DxoEditingComponent, DxoLookupComponent } from 'devextreme-angular/ui/nested';
import { DxiToolbarItemComponent } from 'devextreme-angular/ui/toolbar';
import { RouterLink } from '@angular/router';
import { NotaFiscalService } from '../../../shared/services/notaFiscal.service';
import { ClienteService } from '../../../shared/services/cliente.service';

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
    itens: []
  };

  clientes: any[] = [];
  produtos: any[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private notaFiscalService: NotaFiscalService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
    this.changeDetectorRef.detectChanges();
  }

  btnNovoClienteOptions = {
    text: '+ Cadastrar Novo Cliente',
    type: 'default',
    onClick: () => this.abrirModalOuNavegarCriarCliente(),
  };

  // GET all clientes
  carregarClientes() {
    this.clienteService.listar().subscribe(listaNotas => {
      this.clientes = listaNotas;
    })
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
