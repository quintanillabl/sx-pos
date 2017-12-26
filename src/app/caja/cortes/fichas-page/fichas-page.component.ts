import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Ficha } from 'app/caja/models/ficha';
import { FichaService } from 'app/caja/services/ficha.service';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'sx-fichas-page',
  templateUrl: './fichas-page.component.html',
  styles: []
})
export class FichasPageComponent implements OnInit {

  fichas$: Observable<Ficha[]>;
  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'folio',  label: 'Folio', width: 50 },
    { name: 'origen', label: 'Origen', width: 450},
    { name: 'fecha', label: 'Fecha',  width: 100},
    { name: 'comentario', label: 'Comentario', width: 300},
  ];

  constructor(
    private servie: FichaService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.fichas$ = this.servie
      .list()
      .do( () => this.procesando = true)
      .delay(2000)
      .finally( () => this.procesando = false);
  }

  search(term) {
    console.log('Buscando ficha: ', term);
  }


}
