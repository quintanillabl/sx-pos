import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { Traslado } from 'app/logistica/models/traslado';
import { TrasladosService } from 'app/traslados/services/traslados.service';


@Component({
  selector: 'sx-recepciones-page',
  templateUrl: './recepciones-page.component.html',
  styleUrls: ['./recepciones-page.component.scss']
})
export class RecepcionesPageComponent implements OnInit {

  traslados$: Observable<Traslado[]>;
  
  search$ = new BehaviorSubject<string>('');
  
  reload$ = new Subject<boolean>();

  procesando = false;
  
  constructor(
    private service: TrasladosService
  ) {
      
    const obs1 = this.search$.asObservable()
      .map( term => _.toInteger(term))
      .distinctUntilChanged()
      .debounceTime(300);

    const obs2 = this.reload$.asObservable().startWith(true)
    
    this.traslados$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : null;
    }).switchMap( documento => this.service
      .list('TPE', documento)
      .do( () => this.procesando = true)
      .delay(300)
      .finally( () => this.procesando = false));
  }
  
    ngOnInit() {
      this.load();
    }
  
    load() {
      this.reload$.next(true);
    }
  
    search(term: string) {
      this.search$.next(term);
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

}
