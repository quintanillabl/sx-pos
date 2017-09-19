import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos-page',
  templateUrl: './movimientos-page.component.html',
  styleUrls: ['./movimientos-page.component.scss']
})
export class MovimientosPageComponent implements OnInit {

  selected = undefined;

  constructor() { }

  ngOnInit() {
  }

}
