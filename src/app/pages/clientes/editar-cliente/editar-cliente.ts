import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { DxiItemComponent, DxoLabelComponent } from 'devextreme-angular/ui/nested';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from '../../documentos/documentos';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../../shared/services/cliente.service';

@Component({
  imports: [DxButtonComponent, DxFormComponent, DxiItemComponent, DxoLabelComponent, RouterLink],
  selector: 'app-editar-cliente',
  styleUrl: './editar-cliente.scss',
  templateUrl: './editar-cliente.html',
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    codigo: '',
    nome: '',
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.clienteService.buscarPorCodigo(codigo).subscribe((cliente) => {
        this.cliente = cliente;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  carregarCliente() {
    const codigo = this.activatedRoute.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.clienteService.buscarPorCodigo(codigo).subscribe((cliente) => {
        this.cliente = cliente;
        (this.changeDetectorRef.detectChanges());
      })
    }
  }

  editarCliente(cliente: Cliente): void {
    this.clienteService.editarCliente(cliente).subscribe(() => {
      alert('Cliente código: ' + cliente.codigo + ' atualizado com sucesso!');
      this.router.navigate(['/nfe/clientes']);
    });
  }

}
