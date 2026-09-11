import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DxFormModule } from 'devextreme-angular';
import { NotaFiscal } from '../../documentos/documentos';

@Component({
  imports: [
    DxFormModule,
  ],
  selector: 'app-criar-nota-fiscal',
  styleUrl: './criar-nota-fiscal.scss',
  templateUrl: './criar-nota-fiscal.html',
})
export class CriarNotaFiscalComponent implements OnInit {

  notas: NotaFiscal[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

}
