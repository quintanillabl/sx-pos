import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';

import { Cliente } from 'app/models';

@Component({
  selector: 'sx-uso-cfdi',
  template: `
    <ng-container [formGroup]="parent">
      <md-select
        placeholder="Uso CFDI"
        formControlName="usoDeCfdi"
        class="fill"
      >
        <md-option *ngFor="let tipo of usos" [value]="tipo.clave"
          >{{ tipo.descripcion }}
        </md-option>
      </md-select>

    </ng-container>
  `,
  styles: [
    `
      .fill {
        width: 100%;
      }
    `,
  ],
})
export class UsoCfdiComponent implements OnInit {
  @Input() parent: FormGroup;

  subscription: Subscription
  cliente: Cliente

  usosV3 = [
    { clave: 'G01', descripcion: 'Adquisición de mercancias (G01)' },
    { clave: 'G03', descripcion: 'Gastos en general (G03)' },
    { clave: 'P01', descripcion: 'Por definir (P01)' },
  ];

  usosV4 = [
    { clave: 'G01', descripcion: 'Adquisición de mercancias (G01)' },
    { clave: 'G03', descripcion: 'Gastos en general (G03)' },
  ];

  usoClienteMostrador = [
    { clave: 'S01', descripcion: 'Sin obligación fiscal (S01)' },
  ]

  usos = [
    { clave: 'G01', descripcion: 'Adquisición de mercancias (G01)' },
    { clave: 'G03', descripcion: 'Gastos en general (G03)' },
    { clave: 'P01', descripcion: 'Por definir (P01)' },
  ];


  constructor() {}

  ngOnInit() {

    this.subscription = this.parent.get('cliente').valueChanges
    .distinctUntilChanged()
    .subscribe( (cliente: Cliente) => {
      if (cliente) {
        this.cliente = cliente;
        this.usos = this.usosV3
        if ( cliente.razonSocial  && cliente.razonSocial !== 'PÚBLICO EN GENERAL' && cliente.regimenFiscal ) {
          this.usos  = this.usosV4;
        }
        if ( cliente.razonSocial === 'PÚBLICO EN GENERAL' && cliente.regimenFiscal ) {
            this.usos = this.usoClienteMostrador;
        }
      }
    });

  }
}
