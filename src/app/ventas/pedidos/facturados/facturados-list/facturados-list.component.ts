import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Venta } from 'app/models';
import {ITdDataTableColumn} from '@covalent/core';

@Component({
  selector: 'sx-facturados-list',
  templateUrl: './facturados-list.component.html',
  styles: [`
    .fill {
      height: 500px
    }
  `]
})
export class FacturadosListComponent implements OnInit {

  @Input() facturas: Venta[];

  @Output() cancelar = new EventEmitter<any>();

  @Output() print = new EventEmitter<any>();

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Factura',width: 50},
    { name: 'pedido',  label: 'Pedido', width: 50},
    { name: 'fecha',  label: 'Fecha', width: 50},
    { name: 'nombre',  label: 'Cliente', width: 350},
    { name: 'total',  label: 'Total',width: 50},
    { name: 'saldo',  label: 'Saldo',width: 50},
    { name: 'cuentaPorCobrar',  label: 'CFDI',width: 50},
    { name: 'formaDePago',  label: 'F.Pago', width: 100},
    { name: 'print',  label: 'P', width: 20},
  ];

  constructor() { }

  ngOnInit() {
  }

  getFormaDePago(row: Venta) {
    let fp = row.formaDePago;
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        fp = 'TAR_DEB';
        break;
      case 'TARJETA_CREDITO':
        fp = 'TAR_CRE';
        break;
      default:
        break;
    }
    return fp
  }

}


