import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Transformacion } from "app/logistica/models/transformacion";
import { TransformacionesService } from "app/logistica/services/transformaciones/transformaciones.service";


@Component({
  selector: 'sx-transformaciones-page',
  templateUrl: './transformaciones-page.component.html',
  styleUrls: ['./transformaciones-page.component.scss']
})
export class TransformacionesPageComponent implements OnInit {

  selected: Transformacion = undefined;
  search$ = new BehaviorSubject('');
  movimientos$: Observable<Transformacion[]>;

  constructor(
    private service: TransformacionesService
  ) { }

  ngOnInit() {
    this.movimientos$ = this.search$
      .debounceTime(300)
      .do( term=> console.log('Buscando transformaciones', term))
      .distinctUntilChanged()
      .switchMap( term => this.service.list(term))
  }

  onSelect(row) {
    this.selected = row;
  }

}
