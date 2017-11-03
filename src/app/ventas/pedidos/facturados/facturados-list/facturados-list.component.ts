import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-facturados-list',
  templateUrl: './facturados-list.component.html',
})
export class FacturadosListComponent implements OnInit {

  @Input() facturas: Venta[];

  @Output() cancelar = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}


