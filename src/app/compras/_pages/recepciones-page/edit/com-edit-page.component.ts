import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as coms from 'app/logistica/store/actions/coms.actions';

import { RecepcionDeCompra } from "app/logistica/models/recepcionDeCompra";
import { Sucursal } from 'app/models';
import { ComsService } from 'app/compras/services/coms.service';

@Component({
  selector: 'sx-com-create-page',
  template: `
  <sx-nav-layout [header]="'Recepcion de compra (COM)'" [modulo]="'Compras'">
    <div layout>
      <sx-com-form   (save)="onSave($event)" flex></sx-com-form>
    </div>
  </sx-nav-layout>
`,
styles: ['']
})
export class ComEditPageComponent implements OnInit {

  procesando = false;
  
  constructor(
    private service: ComsService,
    private router: Router,
  ) { }
  
  ngOnInit() {}
  
  onSave(com: RecepcionDeCompra) {
    this.service
      .update(com)
      .subscribe(
        com => this.router.navigate(['/compras/recepciones']),
        err => this.handlePostError(err)
      );
  }
  
  private handlePostError(response){
    console.log('Error al salvar compra: ', response);
  }

}
