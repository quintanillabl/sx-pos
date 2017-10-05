import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import { ITdDataTableColumn, TdDialogService, TdLoadingService } from "@covalent/core";

import * as formOrdenes from 'app/compras/store/reducers';
import * as Compras from 'app/compras/store/actions/ordenes.actions';

import { Compra } from "app/models";
import { OrdenesService } from 'app/compras/services/ordenes.service';



const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;

@Component({
  selector: 'sx-ordenes-show',
  templateUrl: './ordenes-show.component.html',
  styleUrls: ['./ordenes-show.component.scss']
})
export class OrdenesShowComponent implements OnInit {

  orden$: Observable<Compra>

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 70 },
    { name: 'producto.descripcion', label: 'Descripcion', width: { min: 200, max: 450 }},
    { name: 'solicitado', label: 'Solicitado', width: 50, numeric: true, format: DECIMAL_FORMAT},
    { name: 'recibido', label: 'Recibido', width: 50, numeric: true, format: DECIMAL_FORMAT},
    { name: 'comentario', label: 'Comentario', width: { min: 100, max: 250 }},
  ];

  constructor(
    private store: Store<formOrdenes.ComprasState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private loadingService: TdLoadingService,
    private router: Router,
    private service: OrdenesService,
    
  ) { }

  ngOnInit() {
    this.orden$ = this.store.select(formOrdenes.getSelectedOrden);
  }

  onDelete(compra: Compra) {
    this._dialogService.openConfirm({
      message: `Compra: ${compra.folio}?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Confirmar eliminación',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // this.store.dispatch(new Compras.DeleteAction(compra.id));
        // this.router.navigate(['/compras/ordenes/']);
        this.doDelete(compra);
      } else {
        
      }
    });
  }

  
  doDelete(compra: Compra) {
    this.loadingService.register('processing');
    this.service
    .delete(compra.id)
    .delay(1000)
    .subscribe( 
      () => { 
        console.log('DELTE SUCCESS', compra);
        this.loadingService.resolve('processing');
        this.router.navigate(['/compras/ordenes'])
      },
      response => {
        this.handlePostError(response);
        this.loadingService.resolve('processing');
      }
    );
  }

  private handlePostError(response){
    console.log('Error en compras: ', response);
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
