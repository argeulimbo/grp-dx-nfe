import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxDataGridComponent, DxTextBoxComponent } from 'devextreme-angular';
import { RouterLink } from '@angular/router';
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
  ) {}

  ngOnInit(): void {
    this.listarClientes();
    this.changeDetectorRef.detectChanges();
  }

  listarClientes(): void {
    this.clienteService.listar().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
}
