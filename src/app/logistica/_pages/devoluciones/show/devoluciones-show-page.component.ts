import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';

import * as fromLogistica from 'app/logistica/store/reducers';

import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";

@Component({
  selector: 'sx-devoluciones-show-page',
  templateUrl: './devoluciones-show-page.component.html',
  styleUrls: ['./devoluciones-show-page.component.scss']
})
export class DevolucionesShowPageComponent implements OnInit {

  devolucion$: Observable<DevolucionDeVenta>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromLogistica.LogisticaState>
  ) { }

  ngOnInit() {
    this.devolucion$ = this.store
      .select(fromLogistica.getSelectedDevolucion)
      .shareReplay();
    this.loading$ = this.store
      .select(fromLogistica.getDevolucionesLoading);

  }

  inventariar(dev: DevolucionDeVenta){
    console.log('Dispatch Mandar a inventario action....');
  }

  delete(dev: DevolucionDeVenta) {
    console.log('Dispatch action to delete entity....');
  }

}
