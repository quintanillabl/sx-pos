import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as coms from 'app/logistica/store/actions/coms.actions';

import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { Sucursal } from 'app/models';

import { ComsService } from 'app/logistica/services/coms/coms.service';

@Component({
  selector: 'sx-sector-create-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-almacen-sector-form flex="80"
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-almacen-sector-form>
    </div>
  `,
  styles: ['']
})
export class SectorCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: ComsService,
    private router: Router,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(com: RecepcionDeCompra) {
    console.log('Salvando recepcion de compra: ', com);
    this.loadingService.register('saving');
    this.service
      .save(com)
      .subscribe(
        (com) => {
          console.log('RMD salvado: ', com);
          this.loadingService.resolve('saving');
          this.router.navigate(['/logistica/inventarios/coms'])
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response){
    console.log('Error al salvar compra: ', response);
  }


}

