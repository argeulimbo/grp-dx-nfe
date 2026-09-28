import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  DxButtonComponent,
  DxDataGridComponent,
  DxFormModule,
  DxSelectBoxComponent,
  DxToastModule,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import {
  DxiColumnComponent,
  DxoEditingComponent,
  DxoLookupComponent,
} from 'devextreme-angular/ui/nested';

import { NotaFiscalService } from '../../../shared/services/notaFiscal.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ItemNotaGrid, NotaFiscal, Produto } from '../../documentos/documentos';
import { ProdutoService } from '../../../shared/services/produto.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [
    DxFormModule,
    DxSelectBoxComponent,
    DxDataGridComponent,
    DxoEditingComponent,
    DxiColumnComponent,
    DxoLookupComponent,
    DxButtonComponent,
    DxToastModule,
    RouterLink,
  ],
  selector: 'app-criar-nota-fiscal',
  styleUrl: './criar-nota-fiscal.scss',
  templateUrl: './criar-nota-fiscal.html',
})
export class CriarNotaFiscalComponent implements OnInit {
  nota: any = {
    numero: null,
    codigoCliente: '',
    dataEmissao: new Date(),
    valorTotal: 0,
    itens: [] as ItemNotaGrid[],
  };

  clientes: any[] = [];
  produtos: Produto[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private notaFiscalService: NotaFiscalService,
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarProdutos();
    this.changeDetectorRef.detectChanges();
  }

  carregarClientes() {
    this.clienteService.listar().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  atualizarValorTotal() {
    const total = (this.nota.itens as ItemNotaGrid[]).reduce((acc, item) => {
      const quantidade = item.quantidade ?? 0;
      const valorUnitario = item.valorUnitario ?? 0;
      return acc + quantidade * valorUnitario;
    }, 0);

    this.nota = { ...this.nota, valorTotal: total };
    this.changeDetectorRef.detectChanges();
  }

  criarNota(nota: NotaFiscal) {
    this.notaFiscalService.criar(nota).subscribe((nota) => {
      this.nota = nota;
      notify(nota, 'success', 4000);
      this.router.navigate(['/nfe/notas']);
    });
  }
}
