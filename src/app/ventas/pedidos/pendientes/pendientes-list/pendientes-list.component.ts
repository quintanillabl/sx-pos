import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

import { Venta } from 'app/models';

@Component({
  selector: 'sx-pedidos-pendientes-list',
  templateUrl: './pendientes-list.component.html',
  styleUrls: ['./pendientes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesListComponent implements OnInit {

  @Input() pedidos: Venta[];

  @Output() edit = new EventEmitter<any>();

  @Output() facturar = new EventEmitter<any>();

  @Output() envio = new EventEmitter<any>();

  @Output() print = new EventEmitter<any>();

  @Output() generarVale = new EventEmitter<any>();

  columns: ITdDataTableColumn[] = [
    //{ name: 'tipo',  label: 'Tipo', width: 10 },
    { name: 'documento',  label: 'Docto', width: 10 },
    { name: 'fecha', label: 'Fecha', width: 10},
    { name: 'nombre', label: 'Cliente', width: 350 },
    { name: 'formaDePago', label: 'F.P', width: 50},
    //{ name: 'clasificacionVale', label: 'Vale',width: 20},
    { name: 'total', label: 'Total', width: 30},
    { name: 'createUser', label: 'Creado', width: 15},
    { name: 'updateUser', label: 'Modificado', width: 15},
    { name: 'comentario', label: 'Comentario', width: 200},
    { name: 'operaciones', label: 'Opc', width: 200},
    
    
    
    // { name: 'zona', label: 'Zona', hidden: false, width: 15},
    // { name: 'municipio', label: 'Mpo', hidden: false, width: 15},
    // { name: 'grupo', label: 'Gpo', hidden: false, width: 15},
    // { name: 'venta.kilos', label: 'Kilos', hidden: false, width: 15 },
    // { name: 'parcial', label: 'Parcial', hidden: false },
    // { name: 'venta.lastUpdated', label: 'Creada', hidden: false },
    // { name: 'retraso', label: 'Retraso', hidden: false },
  ];


  constructor() { }

  ngOnInit() {
  }

  onEdit(pedido: Venta) {
    this.edit.emit(pedido);
  }

  onFacturar(pedido: Venta) {
    this.facturar.emit(pedido);
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
      case 'TRANSFERENCIA':
        fp = 'TRANSF'
        break;
      case 'DEPOSITO_EFECTIVO':
        fp = 'DEP_EFE';
        break;
      case 'DEPOSITO_CHEQUE':
        fp = 'DEP_CHE';
        break;
      default:
        break;
    }
    return fp
  }

  

}
