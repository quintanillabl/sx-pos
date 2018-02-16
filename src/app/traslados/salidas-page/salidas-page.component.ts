import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { Traslado } from 'app/logistica/models/traslado';
import { TrasladosService } from 'app/traslados/services/traslados.service';


@Component({
  selector: 'sx-salidas-page',
  templateUrl: './salidas-page.component.html'
})
export class SalidasPageComponent implements OnInit {

  traslados$: Observable<any>;
  procesando = false;
  term = ''
  _pendientes = false;
  
  constructor(
    private service: TrasladosService
  ) {}
  
  ngOnInit() {
    this.load();
  }
  
  load() {
    this.traslados$ = this.service
    .list({tipo: 'TPS', term: this.term, pendientes: this.pendientes})
    .finally( () => this.procesando = false)
    .catch( err => this.handleError(err))
  }

  search(term: string) {
    this.term = term;
    this.load();
  }
  
  print(tps: Traslado) {
    this.procesando = true;
    this.service.print(tps)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.error(error2));
  }

  handleError(err) {
    console.log(err)
    return Observable.empty();
  }

  set pendientes(val) {
    this._pendientes = val;
    this.load();
  }

  get pendientes() {
    return this._pendientes
  }

}
