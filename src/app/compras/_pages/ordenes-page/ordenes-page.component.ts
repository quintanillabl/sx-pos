import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';

import { OrdenesService } from "../../services/ordenes.service";
import { Compra } from "app/models";
import * as fromCompras from 'app/compras/store/reducers';
import { SearchAction } from 'app/compras/store/actions/ordenes.actions';

@Component({
  selector: 'sx-ordenes-page',
  templateUrl: './ordenes-page.component.html',
  styleUrls: ['./ordenes-page.component.scss']
})
export class OrdenesPageComponent implements OnInit {

  ordenes$: Observable<Compra[]>;
  searchTerm$: Observable<string>;
  loading$: Observable<boolean>;
  selected$: Observable<Compra>;

  constructor(
    private ordenesService: OrdenesService,
    private store: Store<fromCompras.ComprasState>
  ) { }

  ngOnInit() {
    this.ordenes$ = this.store.select(fromCompras.getPendientes);
    this.searchTerm$ = this.store.select(fromCompras.getSearchTerm);
    this.loading$ = this.store.select(fromCompras.getOrdenesLoading);
  }

  search(folio: string){
    this.store.dispatch(new SearchAction(folio));
  }

}
