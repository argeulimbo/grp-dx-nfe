import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { DxiItemComponent, DxiValidationRuleComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import {ActivatedRoute, Router, RouterLink } from '@angular/router';
import {ProdutoService} from '../../../shared/services/produto.service';
import {Produto} from '../../documentos/documentos';

@Component({
  imports: [
    DxButtonComponent,
    DxFormComponent,
    DxiItemComponent,
    DxiValidationRuleComponent,
    DxoLabelComponent,
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
      this.produtoService.buscarPorCodigo(codigo).subscribe((produto) => {
        this.produto = produto;
        (this.changeDetectorRef.detectChanges());
      })
    }
  }

  editarProduto(produto: Produto):void {
    this.produtoService.editarProduto(produto).subscribe({
     next: () => {
       this.router.navigate(['/nfe/produtos']);
     },
      error: (erro) => {
       console.log('Erro ao editar produto: ', erro);
      }
    });
  }

}
