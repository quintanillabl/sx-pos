import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TIPOS } from 'app/models/venta';
import { Cliente } from 'app/models';
import { Subscription } from 'rxjs';

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
export class TipoFieldComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;

  subscription: Subscription

  tipos = [
    {clave:'CON', descripcion: 'Contado'},
    {clave:'CRE', descripcion: 'Crédito'}
  ];

  constructor() { }

  ngOnInit() {
    this.subscription = this.parent.get('cliente').valueChanges
    .filter(value => value!==null)
    .subscribe( (cliente: Cliente) => {
      if(cliente.credito) {
        this.parent.get('tipo').setValue('CRE');
        this.parent.get('tipo').enable();
      } else {
        this.parent.get('tipo').setValue('CON');
        this.parent.get('tipo').disable();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
