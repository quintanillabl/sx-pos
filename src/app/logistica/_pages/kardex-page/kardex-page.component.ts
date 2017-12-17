import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KardexService } from '../../services/kardex.service';
import { Inventario } from 'app/logistica/models/inventario';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sx-kardex-page',
  templateUrl: './kardex-page.component.html',
  styleUrls: ['./kardex-page.component.scss']
})
export class KardexPageComponent implements OnInit {

  movimientos$: Observable<Inventario[]>;
  search$ = new BehaviorSubject<string>('');
  procesando = false;

  constructor(
    private service: KardexService
  ) {
    this.movimientos$ = this.search$
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => {
      this.procesando = true;
      return this.service
      .list(term)
      .delay(200)
      .catch( err => {
        this.handleError(err)
        return Observable.of([])
      })
      .finally( ()=> this.procesando = false);
    });
   }

  ngOnInit() {
    
  }

  search(term: string) {
    this.search$.next(term);
  }

  handleError(error){
    this.procesando = false;
    console.debug('Error: ', error)
  }

}
