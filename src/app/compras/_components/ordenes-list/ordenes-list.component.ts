import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

import { Compra } from "app/models";



@Component({
  selector: 'sx-ordenes-list',
  templateUrl: './ordenes-list.component.html',
  styleUrls: ['./ordenes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenesListComponent implements OnInit {

  @Input() compras: Array<Compra> = [];

  @Input() selectedRows: any[] = [];

  columns: ITdDataTableColumn[] = [
    { name: 'folio',  label: 'Folio', width: {min: 10, max: 20}},
    { name: 'sucursal.nombre',  label: 'Sucursal', width: {min: 100, max: 100}},
    { name: 'fecha', label: 'Fecha', width: {min: 10, max: 20}},
    { name: 'proveedor', label: 'Proveedor', width: 500},
    { name: 'comentario', label: 'Comentario', width: {min: 400, max: 400}},
    { name: 'lastUpdated', label: 'Modificado', width: {min: 30, max: 30}},
    { name: 'ultimaDepuracion', label: 'U.D.', width: {min: 30, max: 30}},
    { name: 'pendiente', label: 'E', width: {min: 10, max: 10}},
  ];

  constructor() { }

  ngOnInit() {
  }

}
