import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  imports: [

  ],
  selector: 'app-criar-nota-fiscal',
  styleUrl: './criar-nota-fiscal.scss',
  templateUrl: './criar-nota-fiscal.html',
})
export class CriarNotaFiscalComponent implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

}
