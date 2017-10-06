import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MovimientosService } from "app/logistica/services/movimientos/movimientos.service";
import { Movimiento } from "app/logistica/models/movimiento";

@Component({
  selector: 'sx-movimientos-page',
  templateUrl: './movimientos-page.component.html',
  styleUrls: ['./movimientos-page.component.scss']
})
export class MovimientosPageComponent implements OnInit {

  selected: Movimiento = undefined;
  search$ = new BehaviorSubject('');
  movimientos$: Observable<Movimiento[]>;

  constructor(
    private service: MovimientosService
  ) { }

  ngOnInit() {
    this.movimientos$ = this.search$
      .debounceTime(300)
      // .do( term => console.log('Buscando movimientos ', term))
      .distinctUntilChanged()
      .switchMap( term => this.service.list(term))
  }

  onSelect(row) {
    this.selected = row;
  }

}
