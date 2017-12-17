import { Component, OnInit, Input } from '@angular/core';

import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';

@Component({
  selector: 'sx-coms-grid',
  templateUrl: './coms-grid.component.html',
  styleUrls: ['./coms-grid.component.scss']
})
export class ComsGridComponent implements OnInit {

  @Input() coms: RecepcionDeCompra[] = [];

  constructor() { }

  ngOnInit() {
  }

}
