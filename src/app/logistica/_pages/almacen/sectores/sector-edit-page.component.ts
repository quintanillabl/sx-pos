import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import { TdLoadingService } from '@covalent/core';

import * as fromRoot from 'app/reducers';
import * as fromLogistica from 'app/logistica/store/reducers';


import { Sucursal } from 'app/models';

import {Sector} from 'app/logistica/models/sector';
import {SectoresService} from 'app/logistica/services/sectores/sectores.service';
import * as Sectores from 'app/logistica/store/actions/sectores.actions';

@Component({
  selector: 'sx-sector-edit-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-almacen-sector-form [sector]="sector$ | async" flex="80" [disabled]="disabled$ | async"
        [sucursal]="sucursal$ | async" (save)="onSave($event)">
      </sx-almacen-sector-form>
    </div>
  `,
  styles: ['']
})
export class SectorEditPageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  sector$: Observable<Sector>;
  disabled$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: SectoresService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.sector$ = this.store.select(fromLogistica.getSelectedSector);
    this.disabled$ = this.route.queryParamMap.map(params => params.get('tipo') === 'show')
  }

  onSave(sector: Sector) {
    console.log('Salvando sector: ', sector);
    this.loadingService.register('saving');
    this.service
      .update(sector)
      .subscribe(
        (res: any) => {
          console.log('Actualizando sector: ', res);
          this.loadingService.resolve('saving');
          this.router.navigate(['/logistica/almacen/sectores'])
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar sector: ', response);
  }


}

