import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';
import {SolicitudesService} from 'app/traslados/services/solicitudes.service';

@Component({
  selector: 'sx-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.scss']
})
export class SolicitudesListComponent implements OnInit {

  solicitudes$: Observable<SolicitudDeTraslado[]>;

  constructor(
    private service: SolicitudesService
  ) {
    this.solicitudes$ = this.service.pendientes();
    this.solicitudes$.subscribe( data =>  console.log('Data: ', data));
  }

  ngOnInit() {
  }

}
