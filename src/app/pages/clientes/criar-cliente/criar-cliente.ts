import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { RouterLink } from '@angular/router';
import { DxiItemComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { Cliente } from '../../documentos/documentos';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../../shared/services/cliente.service';

@Component({
  imports: [DxButtonComponent, RouterLink, DxFormComponent, DxiItemComponent, DxoLabelComponent],
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
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
  ) {}

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }

  criarCliente(cliente: Cliente) {
    this.clienteService.criar(cliente).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }
}
