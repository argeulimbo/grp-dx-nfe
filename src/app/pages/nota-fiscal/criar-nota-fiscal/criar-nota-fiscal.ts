import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxFormModule, DxSelectBoxComponent } from 'devextreme-angular';
import { Cliente, NotaFiscal } from '../../documentos/documentos';

@Component({
  imports: [DxFormModule, DxSelectBoxComponent],
  selector: 'app-criar-nota-fiscal',
  styleUrl: './criar-nota-fiscal.scss',
  templateUrl: './criar-nota-fiscal.html',
})
export class CriarNotaFiscalComponent implements OnInit {
  nota: NotaFiscal = {
    dataEmissao: new Date(),
  };

  clientes: Cliente[] = [];

  dataEmissao: Date = new Date();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
