import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";
import { Sucursal } from 'app/models';

import { DevolucionesService } from "app/logistica/services/devoluciones/devoluciones.service";


@Component({
  selector: 'sx-devolucion-create-page',
  template: `
    <div layout layout-align="center stretch">
      <sx-devolucion-form flex="80" [sucursal]="sucursal$ | async" (save)="onSave($event)"></sx-devolucion-form>
    </div>
  `,
  styles: ['div { height: 90vh; }']
})
export class DevolucionCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private service: DevolucionesService,
    private router: Router
  ) { }

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
    this.service
      .save(dev)
      .subscribe( 
        (rmd) => {
          console.log('RMD salvado: ', rmd);
          this.router.navigate(['/logistica/inventarios/devoluciones'])
        },
        response => {
          console.log('An HTTP Error: ', response);
        }
      );
  }

}
