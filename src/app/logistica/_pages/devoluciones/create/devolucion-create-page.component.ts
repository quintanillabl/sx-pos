import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";
import { Sucursal } from 'app/models';

@Component({
  selector: 'sx-devolucion-create-page',
  template: `
    <div layout>
      <sx-devolucion-form flex="80" [sucursal]="sucursal$ | async"></sx-devolucion-form>
    </div>
  `
})
export class DevolucionCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor() { }

  ngOnInit() {
    
    // Temporal mientras la obtenemos del ConfigState
    this.sucursal$ = Observable.of({
      id: '402880fc5e4ec411015e4ec64e70012e',
      clave: '10',
      nombre: 'TACUBA'
    });

  }

  onSave(dev: DevolucionDeVenta) {
    console.log('Salvando devolucion de vanta: ', dev)
  }

}
