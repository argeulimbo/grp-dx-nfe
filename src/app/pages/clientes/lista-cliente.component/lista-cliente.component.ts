import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  DxButtonComponent,
  DxDataGridComponent,
  DxTextBoxComponent,
  DxTemplateDirective,
  DxToastModule,
} from 'devextreme-angular';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../../shared/services/cliente.service';
import { DxiColumnComponent } from 'devextreme-angular/ui/nested';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxTextBoxComponent,
    RouterLink,
    DxiColumnComponent,
    DxTemplateDirective,
    DxToastModule,
  ],
  selector: 'app-lista-cliente.component',
  styleUrl: './lista-cliente.component.scss',
  templateUrl: './lista-cliente.component.html',
})
export class ListaClienteComponent implements OnInit {
  clientes: any[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.listar().subscribe((clientes) => {
      this.clientes = clientes;
      this.changeDetectorRef.detectChanges();
    });
  }

  excluirCliente(codigo: string): void {
    confirm('Deseja excluir este cliente?', 'Excluir Cliente').then((resultado: boolean): void => {
      if (resultado) {
        this.clienteService.excluir(codigo).subscribe({
          next: (cliente: string): void => {
            notify(cliente, 'success', 4000);
            this.listarClientes();
          },
          error: (erro: HttpErrorResponse): void => {
            const mensagemErro = typeof erro.error === 'string'
            ? erro.error
              : 'Erro inesperado ao excluir cliente';
            notify(mensagemErro, 'error', 4000);
          }
        })
      }
    })
  }

}
