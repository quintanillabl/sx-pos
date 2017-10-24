import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-pedido-partidas-grid',
  templateUrl: './partidas-grid.component.html',
  styleUrls: ['./partidas-grid.component.scss']
})
export class PartidasGridComponent implements OnInit {

  @Output() insert = new EventEmitter();

  @Input() partidas = [];

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'producto.clave', label: 'Clave', width: 5},
    { name: 'producto.descripcion', label: 'Producto'},
    { name: 'cantidad', label: 'Cantidad', numeric: true,  width: 5},
    { name: 'precio', label: 'Precio', numeric: true,  width: 5},
    { name: 'importe', label: 'Imp Bruto', numeric: true,  width: 5},
    { name: 'descuento', label: 'Desc(%)', numeric: true,  width: 5},
    { name: 'subTotal', label: 'Sub Total', numeric: true,  width: 5},
    { name: 'cortado', label: 'Corte', numeric: true,  width: 5},
    { name: 'vale', label: 'Vale', width: 5},
  ];

  constructor() { }

  ngOnInit() {}

}
