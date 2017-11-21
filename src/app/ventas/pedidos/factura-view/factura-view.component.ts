import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {TdLoadingService, TdDialogService} from '@covalent/core';
import * as FileSaver from 'file-saver';


import * as fromRoot from 'app/reducers';
import {Sucursal, Venta} from 'app/models';
import {PedidosService} from 'app/ventas/pedidos/services/pedidos.service';

@Component({
  selector: 'sx-factura-view',
  templateUrl: './factura-view.component.html',
  styleUrls: ['./factura-view.component.scss']
})
export class FacturaViewComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  venta$: Observable<Venta>;
  procesando = false;

  constructor(
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.venta$ = this.route.paramMap.switchMap( params => this.service.get(params.get('id')));
    this.venta$.subscribe(venta => console.log('View venta: ', venta));
  }

  load() {
    this.venta$ = this.route.paramMap
      .switchMap( params => this.service.get(params.get('id')));
    this.venta$.subscribe(v => console.log('Venta: ', v));
  }

  cancelar(factura: Venta) {
    console.log('Cancelando factura: ', factura);
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

  timbrar(venta: Venta) {
    if (venta.cuentaPorCobrar && !venta.cuentaPorCobrar.uuid) {
      console.log('Timbrando factura: ', venta.cuentaPorCobrar);
      this.procesando = true;
      this.service.timbrar(venta)
        .subscribe( cfdi => {
          this.procesando = false;
          this.load();
          console.log('Cfdi generado: ', cfdi)
        }, error2 => this.handleError(error2))
    }
  }

  mostrarXml(venta: Venta) {
    console.log('Mostrando xml');
    this.service.mostrarXml(venta)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'text/xml'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

  print(venta: Venta) {
    if ( venta.cuentaPorCobrar.cfdi === null || !venta.cuentaPorCobrar.cfdi.uuid) {
      this.openAlert('Esta factura no es ha timbrado por lo que no se puede imprimir')
      return
    }
    if (venta.cuentaPorCobrar.cfdi.uuid) {
      this.printCfdi(venta.cuentaPorCobrar.cfdi);
    }
  }

  printCfdi(cfdi) {
    console.log('Imprimiendo cfdi: ', cfdi);
    this.procesando = true;
    this.service.imprimirCfdi(cfdi)
      .delay(1000)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.procesando = false;
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  handleError(error) {
    this.procesando = false;
    console.error('Error: ', error);
  }

}