import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { ComsService } from 'app/compras/services/coms.service';

@Component({
  selector: 'sx-recepciones-page',
  templateUrl: './recepciones-page.component.html',
  styleUrls: ['./recepciones-page.component.scss']
})
export class RecepcionesPageComponent implements OnInit, OnDestroy {

  
  coms$: Observable<RecepcionDeCompra[]>;
  coms: RecepcionDeCompra[] = [];
  search$ = new BehaviorSubject<string>('');
  procesando = false;
  subs: Subscription;

  constructor(
    private service: ComsService,
  ) { 
    
    this.coms$ = this.search$.debounceTime(300)
      .switchMap( term => {
        return this.service.list({term: term})
        .do( () => this.procesando = true)
        .delay(100)
        .catch( error2=> this.handleError(error2))
        .finally( () => this.procesando = false)
      });
      
    this.subs = this.coms$.subscribe( coms  =>  this.coms = coms);
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  search(term: string){
    this.search$.next(term);
  }

  load() {
    this.search$.next('');
  }

  handleError(ex) {
    console.error(ex)
    return Observable.of(ex);
  }
  

}

