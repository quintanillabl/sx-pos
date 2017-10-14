import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import * as FileSaver from 'file-saver'; 

import * as fromRoot from 'app/reducers';
import * as fromLogistica from 'app/logistica/store/reducers';

import { Sucursal } from 'app/models';
import { Embarque } from 'app/logistica/models/embarque';
import * as Embarques from 'app/logistica/store/actions/embarques.actions';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import { Envio } from 'app/logistica/models/envio';
import { Venta } from 'app/models/venta';
import { VentaDet } from 'app/models/ventaDet';

@Component({
  selector: 'sx-envio-edit-page',
  template: `
    <div layout
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      
      <sx-envio-parcial-form [envio]="envio$ | async" [partidasDeVenta]="partidas$ | async">
      </sx-envio-parcial-form>
      
      
    </div>
  `,
  styles: ['']
})
export class EnvioEditPageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  embarque$: Observable<Embarque>;
  venta$: Observable<Venta>;
  partidas$: Observable<VentaDet>;
  envio$: Observable<Envio>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: EmbarqueService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.embarque$ = this.store.select(fromLogistica.getSelectedEmbarque);

    this.envio$ = this.route.paramMap
      .switchMap(map => this.service.getEnvio(map.get('id')));

    /*
    this.venta$ = this.sucursal$.combineLatest(this.envio$)
    .switchMap( val => {
      const sucursal = val[0];
      const envio = val[1];
      return this.service.buscarVenta(sucursal.id,envio.entidad, envio.documento, envio.fechaDocumento);
    });
    */
    
    this.partidas$ = this.sucursal$.combineLatest(this.envio$)
    .switchMap( val => {
      const sucursal = val[0];
      const envio = val[1];
      return this.service.buscarPartidasDeVenta(sucursal.id,envio.entidad, envio.documento, envio.fechaDocumento);
    });
    
    //.subscribe( val => {console.log('Combine latest:', val)});
    
  }

  onSave(embarque: Embarque) {
    this.loadingService.register('saving');
    this.service
      .update(embarque)
      .subscribe(
        (res: any) => {
          console.log('Embarque actualizado: ', res);
          this.loadingService.resolve('saving');
          //this.router.navigate(['/logistica/almacen/sectores/show', res.id], { queryParams: { tipo: 'show' } })
          this.router.navigate(['/logistica/embarques/embarques'])
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('saving');
        }
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar embarque: ', response);
  }

  onPrint(embarque) {
    this.service.print(embarque.id)
    .subscribe(res => {
      let blob = new Blob([res], { 
        type: 'application/pdf' 
      });
      let filename = `embarque_${embarque.documento}.pdf`;
      FileSaver.saveAs(blob, filename);
    });
  }


}

