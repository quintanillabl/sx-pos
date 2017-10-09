import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/conteos.actions';
import { GenerarConteoAction } from 'app/logistica/store/actions/conteos.actions';
import { Conteo } from 'app/logistica/models/conteo';


@Component({
  selector: 'sx-almacen-conteo-page',
  templateUrl: './conteo-page.component.html',
})
export class ConteoPageComponent implements OnInit {

  conteos$: Observable<Conteo[]>;
  loading$: Observable<boolean>;


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.conteos$ = this.store
      .select(fromRoot.getConteos)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getConteosLoading);
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

  

  get title() {
    return 'Configuración de conteo físico de invenario';
  }

}
