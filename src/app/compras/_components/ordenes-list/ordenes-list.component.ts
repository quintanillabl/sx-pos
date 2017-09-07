import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Compra } from "app/models";

@Component({
  selector: 'sx-ordenes-list',
  templateUrl: './ordenes-list.component.html',
  styleUrls: ['./ordenes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenesListComponent implements OnInit {

  @Input() compras: Array<Compra> = [];
  
  @Output() edit = new EventEmitter<Compra>();
  
  @Output() info = new EventEmitter<Compra>();

  constructor() { }

  ngOnInit() {
  }

  showInfo(compra: Compra) {
    this.info.emit(compra);
  }

  editEntity(compra: Compra) {
    this.edit.emit(compra);
  }

}
