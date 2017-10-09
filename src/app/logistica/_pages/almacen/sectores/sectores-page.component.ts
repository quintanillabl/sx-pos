import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from 'app/logistica/store/reducers';
import {GenerarConteoAction, SearchAction} from 'app/logistica/store/actions/sectores.actions';
import {Sector} from 'app/logistica/models/sector';
import {TdDialogService} from '@covalent/core';


@Component({
  selector: 'sx-almacen-sectores-page',
  templateUrl: './sectores-page.component.html',
})
export class SectoresPageComponent implements OnInit {

  sectores$: Observable<Sector[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.sectores$ = this.store
      .select(fromRoot.getSectores)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getSectoresLoading);
    this.load();
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
  }

  genearConteo() {
    this._dialogService.openConfirm({
      message: `Cargar secrores ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doGenerarConteo();
      }
    });
  }

  private doGenerarConteo() {
    console.log('Generando Conteos');
    this.store.dispatch(new GenerarConteoAction());
  }

}
