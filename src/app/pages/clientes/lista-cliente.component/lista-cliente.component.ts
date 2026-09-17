import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxDataGridComponent, DxTextBoxComponent, DxTemplateDirective } from 'devextreme-angular';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../../shared/services/cliente.service';
import { DxiColumnComponent } from 'devextreme-angular/ui/nested';

@Component({
  imports: [
    DxButtonComponent,
    DxDataGridComponent,
    DxTextBoxComponent,
    RouterLink,
    DxiColumnComponent,
    DxTemplateDirective
  ],
  selector: 'app-lista-cliente.component',
  styleUrl: './lista-cliente.component.scss',
  templateUrl: './lista-cliente.component.html',
})
export class ListaClienteComponent implements OnInit {

  clientes: any[] = [];

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private router: Router
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

  editarCliente(codigo: string): void {
    this.router.navigate(['/nfe/clientes', codigo]);
  }

  excluirCliente(codigo: string): void {
    this.clienteService.excluir(codigo);
    alert('Cliente excluído! ' + codigo);
  }

}
