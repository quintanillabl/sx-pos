import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdDialogService } from '@covalent/core';

import * as fromLogistica from 'app/logistica/store/reducers';
import { DeleteAction } from 'app/logistica/store/actions/devoluciones.actions';
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
    private store: Store<fromLogistica.LogisticaState>,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.devolucion$ = this.store
      .select(fromLogistica.getSelectedDevolucion)
      .shareReplay();
    this.loading$ = this.store
      .select(fromLogistica.getDevolucionesLoading);

  }

  inventariar(dev: DevolucionDeVenta){
    this._dialogService.openAlert({
      message: 'Por cuestión de mantenimiento a la base de datos por el momento esta operación no está operando.',
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Inventariar', //OPTIONAL, hides if not provided
      closeButton: 'Cancelar', //OPTIONAL, defaults to 'CLOSE'
    });
  }

  onDelete(rmd: DevolucionDeVenta) {
    this._dialogService.openConfirm({
      message: 'Eliminar este documento?',
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancelar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.store.dispatch(new DeleteAction(rmd.id));
        this.router.navigate(['/logistica/inventarios/devoluciones']);
      } else {
        
      }
    });
  }

  print() {
    this._dialogService.openAlert({
      message: 'La impresión de este documento está en desarrollo',
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Impresíon', //OPTIONAL, hides if not provided
      closeButton: 'Cancelar', //OPTIONAL, defaults to 'CLOSE'
    });

  }

}
