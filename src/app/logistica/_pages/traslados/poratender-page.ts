import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';
import {SolsService} from 'app/logistica/services/sols/sols.service';

@Component({
  selector: 'sx-sols-por-atender-page',
  template: `
    <div layout="row" layout-align="start center" class="pad-left-sm pad-right-sm">
    </div>
    <md-divider></md-divider>
    <sx-sols-grid [sols]="sols$ | async" tipo="POR_ATENDER"></sx-sols-grid>
    <md-divider></md-divider>
  `
})
export class SolicitudesPorAtenderPageComponent implements OnInit{

  sols$: Observable<SolicitudDeTraslado[]>;

  constructor(
    private solsService: SolsService
  ) {}

  ngOnInit(): void {
    this.sols$ = this.solsService.peidnetesDeAtender();
    this.sols$.subscribe( sols => { console.log('Sols Pendientes de atender: ', sols)})
  }

}
