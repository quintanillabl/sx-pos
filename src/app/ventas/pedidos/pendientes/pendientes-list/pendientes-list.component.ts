import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import {MdDialog} from '@angular/material';
import { Venta } from 'app/models';
import { PartidasDialogComponent } from '../../../_components/partidas-dialog/partidas-dialog.component';

@Component({
  selector: 'sx-pedidos-pendientes-list',
  templateUrl: './pendientes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesListComponent implements OnInit {
  @Input() pedidos: Venta[];

  @Output() edit = new EventEmitter<any>();

  @Output() facturar = new EventEmitter<any>();

  @Output() envio = new EventEmitter<any>();

  @Output() cancelarEnvio = new EventEmitter<any>();

  @Output() print = new EventEmitter<any>();

  @Output() generarVale = new EventEmitter<any>();

  @Output() cambioDeCliente = new EventEmitter<any>();

  columns: ITdDataTableColumn[] = [
    //{ name: 'tipo',  label: 'Tipo', width: 10 },
    { name: 'documento', label: 'Docto', width: 10 },
    { name: 'fecha', label: 'Fecha', width: 10 },
    { name: 'nombre', label: 'Cliente', width: 350 },
    // { name: 'formaDePago', label: 'F.P', width: 30 },
    { name: 'total', label: 'Total', width: 30 },
    { name: 'createUser', label: 'Creado', width: 50 },
    //{ name: 'updateUser', label: 'Modificado', width: 50 },
    { name: 'comentario', label: 'Comentario', width: 170 },
    { name: 'operaciones', label: 'Opc', width: 200 }
  ];

  constructor(public dialog: MdDialog) {}

  ngOnInit() {}

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
        fp = 'TRANSF';
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
    return fp;  
  }

  permitirCambioDeCliente(venta: Venta) {
    if (venta.tipo !== 'CRE') {
      if (venta.descuento <= venta.descuentoOriginal) {
        return true;
      }
    }
    return false;
  }

  showDetails(pedido: Venta){
    
    let id=pedido.id
    const dialogRef = this.dialog.open(PartidasDialogComponent, {data: {pedido: pedido }});
  }

}
