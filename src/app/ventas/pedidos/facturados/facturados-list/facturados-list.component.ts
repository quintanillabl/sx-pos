import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Venta } from 'app/models';
import {ITdDataTableColumn} from '@covalent/core';

@Component({
  selector: 'sx-facturados-list',
  templateUrl: './facturados-list.component.html',
})
export class FacturadosListComponent implements OnInit {

  @Input() facturas: Venta[];

  @Output() cancelar = new EventEmitter<any>();

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Documento', numeric: true, width: 10 },
    { name: 'fecha',  label: 'Fecha', width: 10},
    { name: 'nombre',  label: 'Cliente', width: 400},
    { name: 'total',  label: 'Total', width: 10},
    { name: 'saldo',  label: 'Saldo', width: 10},
    { name: 'cuentaPorCobrar',  label: 'CFDI', width: 20},
    { name: 'formaDePago',  label: 'F.Pago'},
  ];

  constructor() { }

  ngOnInit() {
  }

}


