import { Component, OnInit, Input, Output } from '@angular/core';

import {Venta, Cliente} from 'app/models';

@Component({
  selector: 'sx-fac-view-header',
  templateUrl: './fac-view-header.component.html',
  styleUrls: ['./fac-view-header.component.scss']
})
export class FacViewHeaderComponent implements OnInit {

  @Input() venta: Venta;

  constructor() { }

  ngOnInit() {
  }

  get cliente(): Cliente {
    return this.venta.cliente;
  }

  consultarCfdi() {
    console.log('Consultando CFDI');
  }

}
