import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import * as ordenes from 'app/compras/store/reducers';
import { Compra } from "app/models";
import { ITdDataTableColumn } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;

@Component({
  selector: 'app-ordenes-show',
  templateUrl: './ordenes-show.component.html',
  styleUrls: ['./ordenes-show.component.scss']
})
export class OrdenesShowComponent implements OnInit {

  orden$: Observable<Compra>

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 70 },
    { name: 'producto.descripcion', label: 'Descripcion', width: { min: 200, max: 450 }},
    { name: 'solicitado', label: 'Solicitado', width: 50, numeric: true, format: DECIMAL_FORMAT},
    { name: 'recibido', label: 'Recibido', width: 50, numeric: true, format: DECIMAL_FORMAT},
    { name: 'comentario', label: 'Comentario', width: { min: 100, max: 250 }},
  ];

  constructor(
    private store: Store<ordenes.ComprasState>
  ) { }

  ngOnInit() {
    this.orden$ = this.store.select(ordenes.getSelectedOrden);
  }

}
