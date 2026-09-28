import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  DxButtonComponent,
  DxDataGridComponent,
  DxTemplateDirective,
  DxTextBoxComponent,
  DxToastModule,
} from 'devextreme-angular';
import { DxiColumnComponent } from 'devextreme-angular/ui/nested';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../../shared/services/produto.service';

@Component({
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxTextBoxComponent,
    DxiColumnComponent,
    RouterLink,
    DxTemplateDirective,
    DxToastModule,
  ],
  selector: 'app-lista-produto.component',
  styleUrl: './lista-produto.component.scss',
  templateUrl: './lista-produto.component.html',
})
export class ListaProdutoComponent implements OnInit {
  produtos: any[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listar().subscribe((produtos) => {
      this.produtos = produtos;
      this.changeDetectorRef.detectChanges();
    });
  }

  excluirProduto(codigo: string): void {
    confirm('Deseja excluir este produto?', 'Excluir Produto').then((resultado) => {
      if (resultado) {
        this.produtoService.excluir(codigo).subscribe((produto) => {
          notify(produto, 'success', 4000);
          this.listarProdutos();
        });
      }
    });
  }
}
