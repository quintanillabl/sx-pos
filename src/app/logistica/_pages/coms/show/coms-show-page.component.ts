import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdDialogService } from '@covalent/core';

import * as fromLogistica from 'app/logistica/store/reducers';
import { DeleteAction } from 'app/logistica/store/actions/coms.actions';
import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";
import { ComsService } from 'app/logistica/services/coms/coms.service';


@Component({
  selector: 'sx-coms-show-page',
  templateUrl: './coms-show-page.component.html',
  styleUrls: ['./coms-show-page.component.scss']
})
export class ComsShowPageComponent implements OnInit {

  com$: Observable<RecepcionDeCompra>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromLogistica.LogisticaState>,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: ComsService
  ) { }

  ngOnInit() {
    this.com$ = this.store
      .select(fromLogistica.getSelectedCom)
      .shareReplay();

    this.loading$ = this.store
      .select(fromLogistica.getComsLoading);
  }

  onDelete(com: RecepcionDeCompra) {
    this._dialogService.openConfirm({
      message: `COM ${com.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Eliminar recepcion de compra',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.store.dispatch(new DeleteAction(com.id));
        this.router.navigate(['/logistica/inventarios/coms']);
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

  inventariar(com){
    if(com.fechaInventario) {
      return
    } else {
      this._dialogService.openConfirm({
        message: `Mandar al inventario  
        recepción de compra: ${com.documento}?`,
        viewContainerRef: this._viewContainerRef, 
        title: 'Inventariar (Operación irreversible)', 
        cancelButton: 'Cancelar', 
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doInventariar(com);
        } 
      });
    }
  }

  doInventariar(com) {
    this.service
    .inventariar(com)
    .catch( error => {
      console.log('Http error', error);
      return Observable.of({description: "Error al generar el movimiento de inventario"});
    }).subscribe( val => {
      console.log('Generacion de inventario: ', val);
      this.router.navigate(['/logistica/inventarios/coms']);
    });
  }

}
