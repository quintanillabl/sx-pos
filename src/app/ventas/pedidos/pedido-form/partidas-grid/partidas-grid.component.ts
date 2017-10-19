import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'clave', label: 'Clave', width: 5},
    { name: 'descripcion', label: 'Producto', width: 50},
    { name: 'precio', label: 'Precio', numeric: true, format: DECIMAL_FORMAT, width: 5},
    { name: 'importeBruto', label: 'Imp Bruto', numeric: true, format: DECIMAL_FORMAT, width: 5},
    { name: 'descuento', label: 'Desc(%)', numeric: true, format: DECIMAL_FORMAT, width: 5},
    { name: 'subTotal', label: 'Sub Total', numeric: true, format: DECIMAL_FORMAT, width: 5},
    { name: 'cortado', label: 'Corte', numeric: true, format: DECIMAL_FORMAT, width: 5},
    { name: 'vale', label: 'Vale', width: 5},
  ];

  partidas: any[] = [];
  

  constructor() { }

  ngOnInit() {
    
  }

}
