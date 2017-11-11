import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {TdLoadingService, TdDialogService} from '@covalent/core';
import * as FileSaver from 'file-saver';


import * as fromRoot from 'app/reducers';
import {Sucursal, Venta} from 'app/models';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'sx-factura-show',
  templateUrl: './factura-show.component.html',
  styleUrls: ['./factura-show.component.scss']
})
export class FacturaShowComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  venta$: Observable<Venta>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: CajaService,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.venta$ = this.route.paramMap.switchMap( params => this.service.getVenta(params.get('id')));
    this.venta$.subscribe(venta => console.log('View venta: ', venta));
  }

  cancelar(factura: Venta) {
    const hoy = new Date()
    const fecha = new Date(factura.fecha)
    const diff = hoy === fecha;
    if (! diff) {
      this.openAlert('La factura no es del día no se puede cancelar');
    } else {
      console.log('Tratando de cancelar factura:', factura);
      console.log(`Hoy: ${hoy} Fac: ${fecha}  Diff: ${diff}`)
      this._dialogService.openConfirm({
        message: `Cancelar factura  ${factura.documento} ?` ,
        viewContainerRef: this._viewContainerRef,
        title: 'Cancelación de facturas',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          // this.service
          //   .cancelar(factura)
          //   .subscribe( res => {
          //     this.router.navigate(['/ventas/pedidos/pendientes']);
          //   }, error => {
          //     console.error('Error al cancelar venta', factura);
          //   });
        }
      });
    }

  }

  onPrint(factura: Venta) {
    // this.service.print(factura.id)
    //   .subscribe(res => {
    //     const blob = new Blob([res], {
    //       type: 'application/pdf'
    //     });
    //     const filename = `FAC_${factura.tipo}-${factura.documento}.pdf`;
    //     FileSaver.saveAs(blob, filename);
    //   });
  }

  openAlert(message: string, title: string = 'Advertencia'): void {
    this._dialogService.openAlert({
      message: message,
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: title,
      closeButton: 'Cerrar',
    });
  }

  mandarPorCorreo(factura: Venta): void {
    this._dialogService.openPrompt({
      message: 'Mandar la factura (PDF y XML) al clente',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: 'Email',
      value: factura.cliente.email,
      cancelButton: 'Cancelar',
      acceptButton: 'Enviar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.doEmil(factura);
      }
    });
  }

  doEmil(factura: Venta) {
    Observable
      .of(true)
      .delay(1000)
      .subscribe( val => this.openAlert('Factura enviada', 'Envio de facturas'));
  }

}

