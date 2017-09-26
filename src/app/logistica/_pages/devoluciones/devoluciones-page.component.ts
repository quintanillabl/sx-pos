import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/devoluciones.actions';
import { DevolucionDeVenta } from 'app/logistica/models/devolucionDeVenta';

@Component({
  selector: 'sx-devoluciones-page',
  templateUrl: './devoluciones-page.component.html',
})
export class DevolucionesVentaPageComponent implements OnInit {

  devoluciones$: Observable<DevolucionDeVenta[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>
  ) { }

  ngOnInit() {
    this.devoluciones$ = this.store
      .select(fromRoot.getDevoluciones)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getDevolucionesLoading);
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

}
