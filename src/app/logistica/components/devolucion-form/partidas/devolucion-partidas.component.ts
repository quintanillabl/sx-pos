import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'sx-devolucion-partidas',
  templateUrl: 'devolucion-partidas.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevolucionPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave', label: 'Producto', tooltip: 'Clave del producto', sortable: true },
    { name: 'producto.descripcion', label: 'Descripción', width: 350 },
    { name: 'ventaDet.cantidad', label: 'Vendido', numeric: true, format: v => v.toFixed(3), width: { min: 50, max: 100 }},
    { name: 'cantidad', label: 'Por devolver', numeric: true, format: v => v.toFixed(3), width: { min: 50, max: 100 }},
  ];

  constructor() { }

  ngOnInit() { }

  scrollToStart() {
    console.log('Scroll to start');
  }
  scrollToLast() {

  }
}