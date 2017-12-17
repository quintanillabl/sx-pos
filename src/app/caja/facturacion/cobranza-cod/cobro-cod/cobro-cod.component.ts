import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Cobro } from 'app/models/cobro';
import { CobroService } from 'app/caja/services/cobro.service';


@Component({
  selector: 'sx-cobro-cod',
  templateUrl: './cobro-cod.component.html',
  styleUrls: ['./cobro-cod.component.scss']
})
export class CobroCodComponent implements OnInit {

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
      // .do(id => console.log('Buscando venta con id: ', id))
      .switchMap( id => this.service.getVenta(id));
  }

  onCancelar() {
    this.router.navigate(['/caja/facturacion']);
  }

  
  onSave(cobroJob) {
    console.log('Generando cobro COD par: ', cobroJob);
    this.loadingService.register('saving');
    this.service
    .cobroContado(cobroJob)
    .subscribe( (res: any) => {
      console.log('Cobro generado exitosamente', res);
      this.loadingService.resolve('saving');
      this.router.navigate(['caja/generadas/show', res.id])
    }, error => {
      console.error(error);
      this.loadingService.resolve('saving');
    });
    
  }
}

