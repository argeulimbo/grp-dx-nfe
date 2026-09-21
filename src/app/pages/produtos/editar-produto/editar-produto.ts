import { Component } from '@angular/core';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { DxiItemComponent, DxiValidationRuleComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { RouterLink } from '@angular/router';

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
export class EditarProdutoComponent {

  produto: any = [];

  editarProduto(produto: any):void {

  }

}
