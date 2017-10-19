import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TIPOS } from 'app/models/venta';

@Component({
  selector: 'sx-tipo-field',
  template: `
  <ng-container [formGroup]="parent">
    <md-select placeholder="Tipo" formControlName="tipo" >
      <md-option *ngFor="let tipo of tipos" 
          [value]="tipo.clave">{{ tipo.clave }}
      </md-option>
    </md-select>
  </ng-container>
  `
})
export class TipoFieldComponent implements OnInit {

  @Input() parent: FormGroup;

  tipos = TIPOS;

  constructor() { }

  ngOnInit() {
  }

}
