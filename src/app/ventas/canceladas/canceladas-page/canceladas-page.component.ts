import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdLoadingService } from '@covalent/core';

import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-canceladas-page',
  templateUrl: './canceladas-page.component.html',
  styleUrls: ['./canceladas-page.component.scss']
})
export class CanceladasPageComponent implements OnInit {

  facturas$: Observable<Venta[]>;
  procesando = false;
  search$ = new BehaviorSubject<string>('');

  constructor(
    private service: PedidosService,
    private loadingService: TdLoadingService,
  ) {
    this.facturas$ = this.search$
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => {
      this.loadingService.register('loading');
      return Observable.of([])
        .delay(1000)
        .catch( err => Observable.of(err))
        .finally( () => this.loadingService.resolve('loading'));
      /*
      return this.service
      .canceladas(term)
      .catch( err => Observable.of(err))
      .finally( () => this.loadingService.resolve('loading'));
      */
    });
  }

  ngOnInit() {
  }

  load() {
    this.search('');
  }

  search(term: string) {
    this.search$.next(term);
  }

}
