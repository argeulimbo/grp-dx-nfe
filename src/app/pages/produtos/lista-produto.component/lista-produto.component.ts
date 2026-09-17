import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxDataGridComponent, DxTemplateDirective, DxTextBoxComponent } from 'devextreme-angular';
import { DxiColumnComponent } from 'devextreme-angular/ui/nested';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProdutoService } from '../../../shared/services/produto.service';
import { Produto } from '../../documentos/documentos';

@Component({
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxTextBoxComponent,
    DxiColumnComponent,
    RouterLink,
    DxTemplateDirective,
  ],
  selector: 'app-lista-produto.component',
  styleUrl: './lista-produto.component.scss',
  templateUrl: './lista-produto.component.html',
})
export class ListaProdutoComponent implements OnInit {
  produtos: any[] = [];

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private produtoService: ProdutoService,
    private router: Router,
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

  editarProduto(codigo: string): void {
    this.router.navigate(['/nfe/notas', codigo]);
  }

  excluirProduto(codigo: string): void {
    this.produtoService.excluir(codigo);
    alert('Produto excluído!');
  }
}
