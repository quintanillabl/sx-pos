import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-facturas-cre-list',
  templateUrl: './facturas-cre-list.component.html',
  styleUrls: ['./facturas-cre-list.component.scss']
})
export class FacturasCreListComponent implements OnInit {

  @Input() pedidos: Venta[];

  @Output() cancelar = new EventEmitter<any>();

  @Output() facturar = new EventEmitter<any>();
  @Output() facturarV4 = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  changeDate(fecha) {
    if (fecha) {
      const fechaFmt = new Date(fecha.substring(0, 10).replace(/-/g, '\/'));
      return fechaFmt
    }
    return fecha
  }


}

