import { Component, OnInit,  ViewContainerRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Movimiento } from 'app/logistica/models/movimiento';
import { MovimientosService } from 'app/logistica/services/movimientos/movimientos.service';

@Component({
  selector: 'app-movimientos-show',
  templateUrl: './movimientos-show.component.html',
  styleUrls: ['./movimientos-show.component.scss']
})
export class MovimientosShowComponent implements OnInit {

  movimiento$: Observable<Movimiento>;

  loading$: Observable<boolean>;

  loader = new BehaviorSubject<boolean>(false);

  private parentRoute = '/logistica/inventarios/movimientos';

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute,
    private service: MovimientosService
  ) { }

  ngOnInit() {
    this.movimiento$ = this.route.paramMap
    .map( params => params.get('id'))
    .switchMap( id => this.service.get(id));

    this.loading$ = this.loader.asObservable();
  }

  onDelete(mov: Movimiento) {
    if(mov.fechaInventario) {
      this.imposibleEliminar();
    } else {
      this._dialogService.openConfirm({
        message: `Eliminar este documento ${mov.tipo} ${mov.documento}?`,
        viewContainerRef: this._viewContainerRef, 
        title: 'Eliminar', 
        cancelButton: 'Cancelar', 
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doDelete(mov);
        } 
      });
    }
  }

  imposibleEliminar(){
    this._dialogService.openAlert({
      message: `
          Este movimiento ya esta inventariado por lo tanto no se puede eliminar, 
          se debe generar un documento complementario
        `,
      viewContainerRef: this._viewContainerRef,
      title: 'Alerta', 
      closeButton: 'Aceptar', 
    });
  }

  private doDelete(mov: Movimiento) {
    this.loader.next(true);
    
    this.service
    .delete(mov.id)
    .delay(2000)
    .subscribe( 
      val => {
        this.loader.next(false);
        this.router.navigate([this.parentRoute]);
        console.log('Eliminando: ', val);
      },
      err => {
        this.loader.next(false);
        console.log('Error al eliminar movimiento...');
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

  inventariar(mov: Movimiento){
    if(mov.fechaInventario) {
      return
    } else {
      this._dialogService.openConfirm({
        message: `Mandar a inventario  registros del 
        documento: ${mov.tipo}-${mov.documento}?`,
        viewContainerRef: this._viewContainerRef, 
        title: 'Inventariar (Operación irreversible)', 
        cancelButton: 'Cancelar', 
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doInventariar(mov);
        } 
      });
    }
  }

  doInventariar(mov) {
    this.service
    .inventariar(mov)
    .catch( error => {
      console.log('Http error', error);
      return Observable.of({description: "Error al generar el movimiento de inventario"});
    }).subscribe( val => {
      console.log('Generacion de inventario: ', val);
      this.router.navigate([this.parentRoute]);
    });
  }

}
