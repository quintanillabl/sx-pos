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

  cxc$: Observable<any>;

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
    this.cxc$ = this.route.paramMap
      .map( params => params.get('id'))
      .switchMap( id => this.service.cuentaPorCobrar(id).delay(1000))
      .shareReplay();
    
      this.cxc$.subscribe(cxc => console.log('Cobrando CXC: ', cxc));
  }

  onCancelar() {
    this.router.navigate(['/caja/cobranzaCod']);
  }

  
  onSave(cobro: Cobro) {
    // console.log('Generando cobro...', cobro);
    this.loadingService.register('saving');
    this.cobroService
    .save(cobro)
    .subscribe( res => {
      console.log('Cobro generado exitosamente', res);
      this.loadingService.resolve('saving');
      // this.router.navigate(['/caja/cobroCod', cobro.id])
      this.onCancelar();
    }, error => {
      console.error(error);
      this.loadingService.resolve('saving');
    });
  }

}
