import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'app/reducers';
import { Sucursal } from 'app/models';

@Component({
  selector: 'sx-pedidos-page',
  templateUrl: './pedidos-page.component.html'
})
export class PedidosPageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

}
