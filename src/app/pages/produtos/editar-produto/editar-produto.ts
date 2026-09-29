import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent, DxToastModule } from 'devextreme-angular';
import { DxiItemComponent, DxiValidationRuleComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import {ActivatedRoute, Router, RouterLink } from '@angular/router';
import {ProdutoService} from '../../../shared/services/produto.service';
import {Produto} from '../../documentos/documentos';
import notify from 'devextreme/ui/notify';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  imports: [
    DxButtonComponent,
    DxFormComponent,
    DxiItemComponent,
    DxiValidationRuleComponent,
    DxoLabelComponent,
    DxToastModule,
    RouterLink,
  ],
  selector: 'app-editar-produto',
  styleUrl: './editar-produto.scss',
  templateUrl: './editar-produto.html',
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto = {
    codigo: '',
    descricao: '',
    valorUnitario: 0,
  }

  codigoProdutoURL: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private produtoService: ProdutoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.carregarProduto();
  }

  carregarProduto() {
    const codigo = this.activatedRoute.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.codigoProdutoURL = codigo;
      this.produtoService.buscarPorCodigo(codigo).subscribe((produto) => {
        this.produto = produto;
        this.changeDetectorRef.detectChanges();
      })
    }
  }

  editarProduto(codigoProdutoUrl: string, produto: Produto): void {
    this.produtoService.editarProduto(this.codigoProdutoURL, produto).subscribe({
      next: () => {
        notify('Produto editado com sucesso!', 'success', 1000);
        this.router.navigate(['/nfe/produtos']);
      },
      error: (erro: HttpErrorResponse) => {
        const mensagemErro = typeof erro.error === 'string'
        ? erro.error
          : 'Erro inesperado ao editar produto';
        notify(mensagemErro, 'error', 1000);
      }
    })
  }

}
