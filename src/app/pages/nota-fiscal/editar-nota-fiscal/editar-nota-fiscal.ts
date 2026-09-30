import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  DxButtonComponent,
  DxDataGridComponent,
  DxFormComponent,
  DxSelectBoxComponent,
  DxTemplateDirective,
  DxToastModule,
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
import notify from 'devextreme/ui/notify';
import { HttpErrorResponse } from '@angular/common/http';

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
    DxToastModule,
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
    valorTotal: 0,
    itens: [],
  };

  clientes: any[] = [];
  produtos: any[] = [];

  numeroNotaURL: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private notaFiscalService: NotaFiscalService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.numeroNotaURL = this.activatedRoute.snapshot.paramMap.get('numero') ?? '';
    if (!this.numeroNotaURL) return;

    forkJoin({
      clientes: this.clienteService.listar(),
      produtos: this.produtoService.listar(),
      nota: this.notaFiscalService.buscarPorNumero(this.numeroNotaURL),
    }).subscribe(({ clientes, produtos, nota }) => {
      this.clientes = clientes;
      this.produtos = produtos;
      this.nota = {
        ...nota,
        itens: (nota.itens ?? []).map((i: any) => ({
          codigoProduto: i.produto?.codigo,
          quantidade: i.quantidade,
          valorUnitario: i.quantidade ? i.totalValor / i.quantidade : 0,
        })),
      };
      this.atualizarValorTotal();
    });
  }

  atualizarValorTotal(): void {
    this.nota.valorTotal = (this.nota.itens ?? []).reduce(
      (acc, item) => acc + (item.quantidade ?? 0) * (item.valorUnitario ?? 0),
      0,
    );
  }

  setProdutoValue = (newData: any, value: any): void => {
    newData.codigoProduto = value;
    newData.valorUnitario = this.produtos.find((p) => p.codigo === value)?.valorUnitario;
  };

  /*
  editarNota(numeroNotaUrl: string, nota: NotaFiscal): void {
    this.notaFiscalService.salvar(this.numeroNotaURL, nota).subscribe({
      next: () => {
        notify('Nota Fiscal alterada com sucesso!', 'success', 4000);
        this.router.navigate(['/nfe/notas']);
      },
      error: (erro: HttpErrorResponse) => {
        const mensagemErro =
          typeof erro.error === 'string' ? erro.error : 'Erro inesperado ao editar nota.';
        notify(mensagemErro, 'error', 4000);
      },
    });
  }
  */

  editarNota(numeroNotaUrl: string, nota: NotaFiscal): void {
    const payload = {
      ...nota,
      itens: (nota.itens ?? []).map((i) => ({
        produto: { codigo: i.codigoProduto },
        quantidade: i.quantidade,
        totalValor: (i.quantidade ?? 0) * (i.valorUnitario ?? 0),
      })),
    };
    this.notaFiscalService.salvar(this.numeroNotaURL, payload as any).subscribe({
      next: () => {
        notify('Nota Fiscal alterada com sucesso!', 'success', 1000);
        this.router.navigate(['/nfe/notas']);
      },
      error: (erro: HttpErrorResponse) => {
        const mensagemErro =
          typeof erro.error === 'string' ? erro.error : 'Erro inesperado ao editar nota.';
        notify(mensagemErro, 'error', 1000);
      }
    });
  }

  onClienteChange(event: any): void {
    if (!event.value) {
      this.nota.cliente = undefined;
      return;
    }
    const clienteSelecionado = this.clientes.find(
      (c) => c.id === event.value || c.codigo === event.value,
    );
    this.nota.cliente = clienteSelecionado || undefined;
  }
}
