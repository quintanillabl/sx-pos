import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

import { Compra } from "app/models";

@Component({
  selector: 'sx-coms-list',
  templateUrl: './coms-list.component.html',
  styles: []
})
export class ComsListComponent implements OnInit {

  @Input() coms: Array<Compra> = [];

  @Input() selectedRows: any[] = [];

  columns: ITdDataTableColumn[] = [
    { name: 'documento', label: 'Docto', width: {min: 10, max: 20}},
    { name: 'fecha', label: 'Fecha', width: {min: 10, max: 20}},
    { name: 'compra',  label: 'Compra', width: {min: 10, max: 20}},
    { name: 'remision',  label: 'Rem', width: {min: 10, max: 20}},
    { name: 'fechaRemision', label: 'Fecha R.', width: {min: 10, max: 20}},
    { name: 'proveedor.nombre', label: 'Proveedor', width: 500},
    { name: 'comentario', label: 'Comentario', width: 350},
    { name: 'lastUpdated', label: 'Modificado', width: 40},
    { name: 'updateUser', label: 'Modificado', width: 40},
  ];

  constructor() { }

  ngOnInit() {
  }

}
