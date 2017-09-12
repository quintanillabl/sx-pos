import { Component, OnInit } from '@angular/core';

import { Cliente } from "@siipapx/models";

@Component({
  selector: 'sx-pedido-form-header',
  templateUrl: './pedido-form-header.component.html',
  styleUrls: ['./pedido-form-header.component.scss']
})
export class PedidoFormHeaderComponent implements OnInit {

  cliente: Cliente = undefined;
  fecha = new Date();

  constructor() { }

  ngOnInit() {
    this.cliente = {
      id: '402880eb5c9dd662015c9e5e44560bfa',
      nombre: 'SERVICIOS INTEGRALES Y COMERCIALES ATLACOMULCO S.A DE C.V',
      rfc: 'SIC060123AJ7'
    }
  }

  get searchLabel() {
    return this.cliente ? 'Cambiar cliente' : ' Buscar cliente'
  }

}
