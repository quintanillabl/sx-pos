import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Embarque } from 'app/logistica/models/embarque';

@Component({
  selector: 'sx-embarque-list',
  templateUrl: './embarque-list.component.html',
  styleUrls: ['./embarque-list.component.scss']
})
export class EmbarqueListComponent implements OnInit {

  @Input() embrques: Embarque[] = [];

  @Output() salida = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  marcarSalida(row) {
    this.salida.emit(row);
  }

}
