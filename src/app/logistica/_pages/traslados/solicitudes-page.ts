import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';
import {SolsService} from 'app/logistica/services/sols/sols.service';

@Component({
  selector: 'sx-sol-page',
  template: `
    <md-card >
      <div layout="row" layout-align="start center" class="pad-left-sm pad-right-sm">
      <span class="push-left-sm">
        <span class="md-title">Solicitudes pendientes </span>
      </span>
        <td-search-box #searchBox backIcon="arrow_back" class="push-right-sm"
                       placeholder="Documento "  flex>
        </td-search-box>
        <span>
        <a md-icon-button [routerLink]="['sol/create']"><md-icon>add</md-icon></a>
      </span>
      </div>
      <md-divider></md-divider>
      <sx-sols-grid [sols]="sols$ | async"></sx-sols-grid>
      <md-divider></md-divider>
    </md-card>
  `
})
export class SolicitudesComponent implements OnInit{

  sols$: Observable<SolicitudDeTraslado[]>;

  constructor(
    private solsService: SolsService
  ) {}

  ngOnInit(): void {
    this.sols$ = this.solsService.list();
  }

}
