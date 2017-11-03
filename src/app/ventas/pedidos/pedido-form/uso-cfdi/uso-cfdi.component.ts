import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'sx-uso-cfdi',
  template: `
  <ng-container [formGroup]="parent">
    <md-select placeholder="Uso CFDI" formControlName="usoDeCfdi" >
      <md-option *ngFor="let tipo of usos"
          [value]="tipo.clave">{{ tipo.clave }}
      </md-option>
    </md-select>
  </ng-container>
  `
})
export class UsoCfdiComponent implements OnInit {

  @Input() parent: FormGroup;

  usos = [
    {clave: 'G01', descripcion: 'Adquisición de mercancias'},
  ];

  constructor() { }

  ngOnInit() {

  }


}

