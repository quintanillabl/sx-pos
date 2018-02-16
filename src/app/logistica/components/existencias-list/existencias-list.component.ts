import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn} from '@covalent/core';

@Component({
  selector: 'sx-existencias-list',
  templateUrl: './existencias-list.component.html',
  styles: []
})
export class ExistenciasListComponent implements OnInit {

  @Input() existencias = [];

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Clave', sortable: true, width: 100 },
    { name: 'producto.descripcion', label: 'Descripción', filter: true, width: 400 },
    { name: 'anio', label: 'Ejercicio', width: 100},
    { name: 'mes', label: 'Mes', width: 100},
    { name: 'cantidad', label: 'Cantidad', width: 150},
    { name: 'recorte', label: 'Recorte', width: 150},
    { name: 'disponible', label: 'Disponible', width: 150},
    { name: 'lastUpdated', label: 'Modificado', width: 150},
  ];

  constructor() { }

  ngOnInit() {}

}



