import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/coms.actions';
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';

@Component({
  selector: 'sx-almacen-conteo-page',
  templateUrl: './conteo-page.component.html',
})
export class ConteoPageComponent implements OnInit {

  coms$: Observable<RecepcionDeCompra[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>
  ) { }

  ngOnInit() {
    this.coms$ = this.store
      .select(fromRoot.getComs)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getComsLoading);
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

}
