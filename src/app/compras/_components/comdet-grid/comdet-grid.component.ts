import { Component, OnInit, Input } from '@angular/core';
import { ITdDataTableColumn } from "@covalent/core";

@Component({
  selector: 'sx-comdet-grid',
  template: `
    <td-data-table 
      [data]="partidas" 
      [columns]="columns">
    </td-data-table>
  `
})
export class ComdetGridComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto'},
    { name: 'producto.descripcion', label: 'Descripcion'},
    { name: 'cantidad', label: 'Cantidad'},
    { name: 'comentario', label: 'Comentario'},
  ];

  @Input() partidas ;

  constructor() { }

  ngOnInit() { }
}