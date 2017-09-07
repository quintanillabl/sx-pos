import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import {Modulo} from '../../_modulos/models/modulo';

@Component({
  selector: 'sx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  application$: Observable<any>;
  modulos$: Observable<Modulo[]>;

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    private store: Store<fromRoot.State>) {
    // this.application$ = store.select(fromRoot.getApplication).delay(500);
    this.application$ = Observable.of(
      {
        nombre: 'SIIPAP SX ',
        descripcion: 'Sistema de administración SIIPAP Rx cloud service',
        image: "/assets/images/pexels-photo-425047.png"
      });
   }

  ngOnInit() {
    this.modulos$ = this.store.select(fromRoot.getModulos);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX-SIIPAP' );

  }

  resolveLink(modulo: Modulo): string {
    return modulo.path ? modulo.path : modulo.nombre.toLowerCase();
  }

}
