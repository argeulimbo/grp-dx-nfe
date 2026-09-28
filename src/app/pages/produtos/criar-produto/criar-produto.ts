import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent, DxToastModule } from 'devextreme-angular';
import { DxiItemComponent, DxiValidationRuleComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../../shared/services/produto.service';
import { Produto } from '../../documentos/documentos';
import notify from 'devextreme/ui/notify';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [
    DxButtonComponent,
    DxFormComponent,
    DxiItemComponent,
    DxoLabelComponent,
    DxToastModule,
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
    this.produtoService.criar(produto).subscribe({
      next: () => {
        notify('Produto criado com sucesso!', 'success', 4000);
        this.router.navigate(['/nfe/produtos']);
      },
      error: (erro: HttpErrorResponse) => {
        const mensagemErro = typeof erro.error === 'string'
        ? erro.error
          : 'Erro inesperado ao criar produto.';
        notify(mensagemErro, 'error', 4000);
      },
    });
  }
}
