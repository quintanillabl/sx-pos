import { Component, OnInit, Input } from '@angular/core';

import {Venta} from 'app/models';

@Component({
  selector: 'sx-fac-show-totales',
  templateUrl: './fac-show-totales.component.html',
  styleUrls: ['./fac-show-totales.component.scss']
})
export class FacShowTotalesComponent implements OnInit {

  @Input() venta: Venta

  constructor() { }

  ngOnInit() {
  }
}
