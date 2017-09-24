import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Compra } from "app/models";

@Component({
  selector: 'sx-ordenes-list',
  templateUrl: './ordenes-list.component.html',
  styleUrls: ['./ordenes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenesListComponent implements OnInit {

  @Input() compras: Array<Compra> = [];

  constructor() { }

  ngOnInit() {
  }

}
