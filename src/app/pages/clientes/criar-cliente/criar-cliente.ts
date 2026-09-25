import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { Router, RouterLink } from '@angular/router';
import { DxiItemComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { Cliente } from '../../documentos/documentos';
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
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }

  criarCliente(cliente: Cliente) {
    this.clienteService.criar(cliente).subscribe((cliente) => {
      this.cliente = cliente;
      alert(cliente);
      this.router.navigate(['/nfe/clientes']);
    });
  }
}
