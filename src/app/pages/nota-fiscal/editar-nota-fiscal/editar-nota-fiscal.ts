import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  DxButtonComponent,
  DxDataGridComponent,
  DxFormComponent,
  DxSelectBoxComponent,
  DxTemplateDirective,
} from 'devextreme-angular';
import {
  DxiColumnComponent,
  DxiItemComponent,
  DxoEditingComponent,
  DxoLabelComponent,
  DxoLookupComponent,
} from 'devextreme-angular/ui/nested';
import { NotaFiscalService } from '../../../shared/services/notaFiscal.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ProdutoService } from '../../../shared/services/produto.service';
import { NotaFiscal } from '../../documentos/documentos';

@Component({
  selector: 'app-editar-nota-fiscal',
  templateUrl: './editar-nota-fiscal.html',
  styleUrl: './editar-nota-fiscal.scss',
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxFormComponent,
    DxSelectBoxComponent,
    DxTemplateDirective,
    DxiColumnComponent,
    DxiItemComponent,
    DxoEditingComponent,
    DxoLabelComponent,
    DxoLookupComponent,
    RouterLink,
  ],
})
export class EditarNotaFiscalComponent implements OnInit {
  nota: NotaFiscal = {
    numero: '',
    cliente: {
      id: 0,
      codigo: '',
      nome: '',
    },
    dataEmissao: new Date(),
    itens: [],
  };

  clientes: any[] = [];
  produtos: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notaFiscalService: NotaFiscalService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit(): void {
    this.carregarListas();
    this.getNumeroNotaURL();
  }

  private carregarListas(): void {
    this.clienteService.listar().subscribe((res) => (this.clientes = res));
    this.produtoService.listar().subscribe((res) => (this.produtos = res));
  }

  private getNumeroNotaURL(): void {
    const numero = this.activatedRoute.snapshot.paramMap.get('numero');
    if (numero) {
      this.notaFiscalService.buscarPorNumero(numero).subscribe((res) => (this.nota = res));
    }
  }

  atualizarValorTotal(): void {
  }

  editarNota(nota: any): void {}
}
