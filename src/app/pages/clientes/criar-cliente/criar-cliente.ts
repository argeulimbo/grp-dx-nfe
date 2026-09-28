import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent, DxToastModule } from 'devextreme-angular';
import { Router, RouterLink } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { DxiItemComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { Cliente } from '../../documentos/documentos';
import { ClienteService } from '../../../shared/services/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [DxButtonComponent, RouterLink, DxFormComponent, DxiItemComponent, DxoLabelComponent, DxToastModule],
  selector: 'app-criar-cliente',
  styleUrl: './criar-cliente.scss',
  templateUrl: './criar-cliente.html',
})
export class CriarCliente implements OnInit {

  cliente: any = {
    codigo: null,
    nome: null,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }

  criarCliente(cliente: Cliente) {
    this.clienteService.criar(cliente).subscribe({
      next: () => {
        this.cliente = cliente;
        notify('Cliente criado com sucesso!', 'success', 4000);
        this.router.navigate(['/nfe/clientes']);
      },
      error: (erro: HttpErrorResponse) => {
        const mensagemErro = typeof erro.error === 'string'
        ? erro.error
          : 'Erro inesperado ao criar cliente';
        notify(mensagemErro, 'error', 4000);
      }
    })
  }
}
