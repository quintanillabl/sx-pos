import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { OrdenesService } from "../../services/ordenes.service";
import { Compra } from "app/models";

@Component({
  selector: 'sx-ordenes-page',
  templateUrl: './ordenes-page.component.html',
  styleUrls: ['./ordenes-page.component.scss']
})
export class OrdenesPageComponent implements OnInit, OnDestroy {

  ordenes$: Observable<Compra[]>;
  ordenes: Compra[] = [];
  search$ = new BehaviorSubject<string>('');
  procesando = false;
  subs: Subscription;

  selectedRows: any[] = [];

  private _pendientes = true;

  constructor(
    private service: OrdenesService,
  ) { 

    this.ordenes$ = this.search$.debounceTime(300)
      .switchMap( term => {
        return this.service.list({term: term, pendientes: this.pendientes})
        .do( () => this.procesando = true)
        .delay(100)
        .catch( error2=> this.handleError(error2))
        .finally( () => this.procesando = false)
      });

    this.ordenes$
    .subscribe( ordenes =>  this.ordenes = ordenes);
  }

  ngOnInit() {
    const params =  JSON.parse(localStorage.getItem('ocompra_params')) || {pendientes: true};
    this._pendientes = params.pendientes;
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

  set pendientes(value) {
    this._pendientes = value;
    const params = {pendientes: this._pendientes};
    localStorage.setItem('ocompra_params', JSON.stringify(params));
    this.load();
  }

  get pendientes() {
    return this._pendientes
  }

  


  recibir() {
    console.log('Generar recepcion de: ', this.pendienteSelected);
  }

  get pendienteSelected() {
    return this.selectedRows.find( item => item.pendiente);
  }
  

}
