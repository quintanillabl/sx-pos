import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {ITdDataTableColumn, TdDialogService} from '@covalent/core';

import * as fromLogistica from 'app/logistica/store/reducers';
import { DeleteAction } from 'app/logistica/store/actions/sols.actions';
import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { SolsService } from 'app/logistica/services/sols/sols.service';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);

@Component({
  selector: 'sx-sol-show-page',
  templateUrl: './sol-show-page.component.html',
  styleUrls: ['./sol-show-page.component.scss']
})
export class SolShowPageComponent implements OnInit {

  sol$: Observable<SolicitudDeTraslado>;
  loading$: Observable<boolean>;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 50 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 350},
    { name: 'solicitado', label: 'Solicitado', numeric: true, format: DECIMAL_FORMAT, width: 100},
    { name: 'solicitado', label: 'Recibido', numeric: true, format: DECIMAL_FORMAT, width: 100},
    { name: 'comentario', label: 'Comentario', width: 300},
  ];

  constructor(
    private store: Store<fromLogistica.LogisticaState>,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SolsService
  ) { }

  ngOnInit() {
    this.sol$ = this.store
      .select(fromLogistica.getSelectedSol)
      .shareReplay();

    this.loading$ = this.store
      .select(fromLogistica.getSolsLoading);
  }

  onDelete(sol: SolicitudDeTraslado) {
    this._dialogService.openConfirm({
      message: `SOL ${sol.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Eliminar solicitud de traslado',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.store.dispatch(new DeleteAction(sol.id));
        this.router.navigate(['/logistica/inventarios/traslados']);
      }
    });
  }

  print() {
    this._dialogService.openAlert({
      message: 'La impresión de este documento está en desarrollo',
      viewContainerRef: this._viewContainerRef,
      title: 'Impresíon',
      closeButton: 'Cancelar',
    });

  }

  inventariar(sol){
    if(sol.fechaInventario) {
      return
    } else {
      this._dialogService.openConfirm({
        message: `
          Mandar al inventario
          recepción de compra: ${sol.documento}?`,
        viewContainerRef: this._viewContainerRef,
        title: 'Inventariar (Operación irreversible)',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doInventariar(sol);
        }
      });
    }
  }

  doInventariar(sol) {
    this.service
      .inventariar(sol)
      .catch( error => {
        console.log('Http error', error);
        return Observable.of({description: 'Error al generar el movimiento de inventario'});
      }).subscribe( val => {
      console.log('Generacion de inventario: ', val);
      this.router.navigate(['/logistica/inventarios/traslados']);
    });
  }

}

