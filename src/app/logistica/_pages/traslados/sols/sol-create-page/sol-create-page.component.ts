import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { Sucursal } from 'app/models';
import { SolsService } from 'app/logistica/services/sols/sols.service';

@Component({
  selector: 'sx-sol-create-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-sol-form flex="80"
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-sol-form>
    </div>
  `,
  styles: ['']
})
export class SolCreatePageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: SolsService,
    private router: Router,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  onSave(sol: SolicitudDeTraslado) {
    console.log('Salvando solicitud de traslado: ', sol);
    this.loadingService.register('saving');
    this.service
      .save(sol)
      .subscribe(
        (res) => {
          console.log('SOL salvado: ', res);
          this.loadingService.resolve('saving');
          this.router.navigate(['/logistica/inventarios/traslados'])
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


