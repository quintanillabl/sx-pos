import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Cobro } from 'app/models/cobro';
import { CobroService } from 'app/caja/services/cobro.service';


@Component({
  selector: 'sx-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.scss']
})
export class CobroComponent implements OnInit {

  venta$: Observable<Venta>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CajaService,
    private cobroService: CobroService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.venta$ = this.route.paramMap
      .map( params => params.get('id'))
      .switchMap( id => this.service.getVenta(id));

    // this.venta$.subscribe(venta => console.log('Cobro de venta: ', venta));
  }

  onCancelar() {
    this.router.navigate(['/caja/facturacion']);
  }

  onFacturar(pedido: Venta) {
    if (pedido.facturar && pedido.tipo !== 'CRE') {
      this._dialogService.openConfirm({
        message: `Facturar el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
        viewContainerRef: this._viewContainerRef,
        title: 'Facturación de contado',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doFacturar(pedido);
        }
      });
    }
  }

  doFacturar(pedido: Venta) {
    this.loadingService.register('saving');
    this.service
      .facturar(pedido)
      .delay(1000)
      .subscribe( res => {
        console.log('Pedido facturado', res);
        this.loadingService.resolve('saving');
        this.router.navigate(['caja/generadas/show', res.id])
      }, error => {
        console.error(error);
        this.loadingService.resolve('saving');
      });
  }

  onSave(cobroJob) {
    console.log('Generando facturacion y cobro: ', cobroJob);
    this.loadingService.register('saving');
    this.service
    .cobroContado(cobroJob)
    .subscribe( (res: any) => {
      console.log('Cobro generado exitosamente', res);
      this.loadingService.resolve('saving');
      this.timbrar(res);
      // this.router.navigate(['caja/generadas/show', res.id])
    }, error => {
      console.error(error);
      this.loadingService.resolve('saving');
    });
  }

  timbrar(venta) {
    if (venta.cuentaPorCobrar && !venta.cuentaPorCobrar.uuid) {
      this.loadingService.register('saving');
      console.log('Timbrando factura: ', venta.cuentaPorCobrar);
      this.service.timbrar(venta)
        .subscribe( cfdi => {
          this.loadingService.resolve('saving');
          this.printCfdi(cfdi);
          this.router.navigate(['caja/generadas/show', venta.id]);
          console.log('Cfdi generado: ', cfdi)
        }, error2 => {
          this.router.navigate(['caja/generadas/show', venta.id])
          this.loadingService.resolve('saving');
          console.error('Error: ', error2);
        })
    }
  }

  printCfdi(cfdi) {
    console.log('Imprimiendo cfdi: ', cfdi);
    this.loadingService.register('saving');
    this.service.imprimirCfdi(cfdi)
      .delay(200)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.loadingService.resolve('saving');
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => {
        this.loadingService.resolve('saving');
        console.error(error2);
      });
  }


}
