import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DxButtonComponent, DxDataGridComponent, DxFormComponent, DxSelectBoxComponent, DxTemplateDirective} from "devextreme-angular";
import {DxiColumnComponent, DxiItemComponent, DxoDropDownOptionsComponent, DxoEditingComponent, DxoLabelComponent,
    DxoLookupComponent
} from "devextreme-angular/ui/nested";
import {DxiToolbarItemComponent} from "devextreme-angular/ui/toolbar";
import { ActivatedRoute, RouterLink} from "@angular/router";
import { NotaFiscalService } from '../../../shared/services/notaFiscal.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ProdutoService } from '../../../shared/services/produto.service';
import { Cliente, NotaFiscal, Produto } from '../../documentos/documentos';

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
export class EditarNotaFiscalComponent implements OnInit {
  nota: NotaFiscal = {
    numero: '',
    codigoCliente: '',
    dataEmissao: new Date(),
    itens: [],
  };

  cliente: Cliente = {
    codigo: '',
    nome: '',
  };

  produto: Produto = {
    codigo: '',
    descricao: '',
    valorUnitario: 0,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notaFiscalService: NotaFiscalService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit() {
    // Lê a nota
    this.getNumeroNotaURL();
  }

  // Método que busca a nota pela URL
  private getNumeroNotaURL(): void {
    const numeroNota = this.activatedRoute.snapshot.paramMap.get('numero');

    if (numeroNota) {
      this.notaFiscalService.buscarPorNumero(numeroNota).subscribe({
        next: (notaFiscal: NotaFiscal) => {
          this.nota = notaFiscal;
          console.log('Nota carregada com sucesso:', this.nota);

          // Passo 1.1: Agora que temos a nota, temos o codigo do cliente. Vamos buscá-lo!
          if (this.nota.codigoCliente) {
            this.carregarCliente(this.nota.codigoCliente);
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar a Nota Fiscal:', erro);
          // Aqui depois você pode colocar um alert ou toast para o usuário
        },
      });
    }
  }

  private carregarCliente(codigoCliente: string): void {
    this.clienteService.buscarPorCodigo(codigoCliente).subscribe({
      next: (clienteRetornado: Cliente) => {
        this.clientes = [clienteRetornado];
        console.log('Cliente carregado com sucesso:', clienteRetornado);
      },
      error: (erro) => {
        console.error('Erro ao buscar o Cliente:', erro);
      },
    });
  }

  clientes: any = [];
  produtos: any = [];

  atualizarValorTotal() {
    return null;
  }

  editarNota(nota: any) {
    return null;
  }
}
