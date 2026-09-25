import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private router: Router
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
      this.numeroNotaURL = numero;
      this.notaFiscalService.buscarPorNumero(numero).subscribe((res) => {
        this.nota = res;
        this.atualizarValorTotal();
      });
    }
  }

  atualizarValorTotal(): void {
    if (!this.nota?.itens) {
      this.nota.valorTotal = 0;
      return;
    }
    this.nota.valorTotal = this.nota.itens.reduce((acc, item: any) => {
      const produto = this.produtos.find(p => p.id === item.produto?.id);
      const valorUnitario = produto?.valorUnitario || item.produto?.valorUnitario || 0;
      const quantidade = item.quantidade || 0;
      return acc + (quantidade * valorUnitario);
    }, 0);
  }

  editarNota(numeroNotaUrl: string, nota: NotaFiscal): void {
    this.notaFiscalService.salvar(this.numeroNotaURL, nota).subscribe(() => {
      alert('Nota Fiscal alterada com sucesso!');
      this.router.navigate(['/nfe/notas']);
    });
  }

  onClienteChange(event: any): void {
    const clienteSelecionado = this.clientes.find(c => c.id === event.value);
    if (clienteSelecionado) {
      this.nota.cliente = clienteSelecionado;
    }
  }

}
