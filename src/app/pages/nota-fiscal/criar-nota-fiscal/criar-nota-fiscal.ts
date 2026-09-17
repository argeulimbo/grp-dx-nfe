import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { DxButtonComponent, DxDataGridComponent, DxFormModule, DxSelectBoxComponent } from 'devextreme-angular';
import { DxiColumnComponent, DxoDropDownOptionsComponent, DxoEditingComponent, DxoLookupComponent } from 'devextreme-angular/ui/nested';
import { DxiToolbarItemComponent } from 'devextreme-angular/ui/toolbar';

import {NotaFiscalService} from '../../../shared/services/notaFiscal.service';
import {ClienteService} from '../../../shared/services/cliente.service';
import { Cliente, ItemNotaGrid, NotaFiscal, Produto } from '../../documentos/documentos';
import {ProdutoService} from '../../../shared/services/produto.service';

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
    numero:           null,
    codigoCliente:    null,
    dataEmissao:      new Date(),
    valorTotal:       0,
    itens:            [] as ItemNotaGrid[]
  };

  clientes: any[] = [];
  produtos: Produto[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private notaFiscalService: NotaFiscalService,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarProdutos();
    this.changeDetectorRef.detectChanges();
  }

  btnNovoClienteOptions = {
    text: '+ Cadastrar Novo Cliente',
    type: 'default',
    onClick: () => this.abrirModalOuNavegarCriarCliente(),
  };

  // GET all clientes
  carregarClientes() {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
    })
  }

  // GET all produtos
  carregarProdutos() {
    this.produtoService.listar().subscribe(produtos => {
      this.produtos = produtos;
    })
  }

  abrirModalOuNavegarCriarCliente() {
    return null;
  }

  atualizarValorTotal() {
    const total = (this.nota.itens as ItemNotaGrid[]).reduce((acc, item) => {
      const quantidade = item.quantidade ?? 0;
      const valorUnitario = item.valorUnitario ?? 0;
      return acc + (quantidade * valorUnitario);
    }, 0);

    // Reatribui o objeto (nova referência) para o dx-form pegar a mudança do formData
    this.nota = { ...this.nota, valorTotal: total };
    this.changeDetectorRef.detectChanges();
  }

  // @Depreciado - invenção de moda
  // private proximoCodigoProduto(offset: number): number {
  //   return Date.now() + offset;
  // }

  criarNota(nota: NotaFiscal) {
    this.notaFiscalService.criar(nota).subscribe(nota => {
      this.nota = nota;
    });
    alert('CRUZEIRAO CABULOSO');
  }

  salvarNota(nota: NotaFiscal) {
    this.notaFiscalService.salvar(nota).subscribe(nota => {
      this.nota = nota;
    });
  }

}
