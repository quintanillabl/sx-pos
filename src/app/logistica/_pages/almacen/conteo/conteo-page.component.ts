import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import {TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction } from 'app/logistica/store/actions/conteos.actions';
import { GenerarConteoAction } from 'app/logistica/store/actions/conteos.actions';
import { Conteo } from 'app/logistica/models/conteo';
import { ConteosService } from 'app/logistica/services/conteos/conteos.service';


@Component({
  selector: 'sx-almacen-conteo-page',
  templateUrl: './conteo-page.component.html',
})
export class ConteoPageComponent implements OnInit {

  conteos$: Observable<Conteo[]>;
  loading$: Observable<boolean>;
  procesando$ = new BehaviorSubject(false);


  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: ConteosService,
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

  generarExistencias() {
    this._dialogService.openConfirm({
      message: `Generar las existencias para el conteo ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doGenerarExistencias();
      }
    });
  }

  private doGenerarExistencias() {
    this.procesando$.next(true);
    console.log('Generando Conteos');
    this.service.generarExistencias()
    .delay(2000)
    .subscribe( 
      (result: any) => { 
        console.log('Proceso terminado: ', result);
        this.procesoTerminado(result.message);
        this.procesando$.next(false);
      }
      ,error => { 
        console.error('Error ', error)
        this.procesando$.next(false);
      }
    )
    // this.store.dispatch(new GenerarConteoAction());
  }

  limpiarExistencias() {
    this._dialogService.openConfirm({
      message: `Limpiar las existencias para el conteo ?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Conteo de inventario',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doLimpiarExistencias();
      }
    });
  }

  private doLimpiarExistencias() {
    this.procesando$.next(true);
    this.service.limpiarExistencias()
    .subscribe( 
      (result: any) => { 
        console.log('Proceso terminado: ', result);
        this.procesoTerminado(result.message);
        this.procesando$.next(false);
      }
      ,error => { 
        console.error('Error ', error)
        this.procesando$.next(false);
      }
    )
    // this.store.dispatch(new GenerarConteoAction());
  }

  private procesoTerminado(message: string) {
    this._dialogService.openAlert({
      message: message,
      viewContainerRef: this._viewContainerRef,
      title: 'Generación de existencias', 
      closeButton: 'Cerrar',
    });
  }

  

  get title() {
    return 'Configuración de conteo físico de invenario';
  }

}
