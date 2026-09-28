import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent, DxToastModule } from 'devextreme-angular';
import { DxiItemComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Cliente } from '../../documentos/documentos';
import { ClienteService } from '../../../shared/services/cliente.service';

@Component({
  imports: [DxButtonComponent, DxFormComponent, DxiItemComponent, DxToastModule,DxoLabelComponent, RouterLink],
  selector: 'app-editar-cliente',
  styleUrl: './editar-cliente.scss',
  templateUrl: './editar-cliente.html',
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    codigo: '',
    nome: '',
  };

  codigoClienteURL: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.carregarCliente();
  }

  carregarCliente() {
    const codigo = this.activatedRoute.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.codigoClienteURL = codigo;
      this.clienteService.buscarPorCodigo(codigo).subscribe((cliente) => {
        this.cliente = cliente;
        (this.changeDetectorRef.detectChanges());
      })
    }
  }

  editarCliente(codigoClienteUrl: string, cliente: Cliente): void {
    this.clienteService.editarCliente(this.codigoClienteURL, cliente).subscribe(() => {
      notify('Cliente código: ' + cliente.codigo + ' atualizado com sucesso!', 'success', 4000);
      this.router.navigate(['/nfe/clientes']);
    });
  }

}
