import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { DxiItemComponent, DxiValidationRuleComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../../shared/services/produto.service';
import { Produto } from '../../documentos/documentos';

@Component({
  imports: [
    DxButtonComponent,
    DxFormComponent,
    DxiItemComponent,
    DxoLabelComponent,
    RouterLink,
    DxiValidationRuleComponent,
  ],
  selector: 'app-criar-produto',
  styleUrl: './criar-produto.scss',
  templateUrl: './criar-produto.html',
})
export class CriarProduto implements OnInit {
  produto: any = {
    codigo: null,
    descricao: null,
    valorUnitario: null,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }

  criarProduto(produto: Produto) {
    this.produtoService.criar(produto).subscribe((produto) => {
      this.produto = produto;
      alert(produto);
      this.router.navigate(['/nfe/produtos']);
    });
  }
}
