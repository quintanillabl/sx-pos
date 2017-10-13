import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from 'app/logistica/store/reducers';
import { SearchAction, RegistrarSalidaAction } from 'app/logistica/store/actions/embarques.actions';
import { Embarque } from 'app/logistica/models/embarque';
import {TdDialogService} from '@covalent/core';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import * as FileSaver from 'file-saver'; 


@Component({
  selector: 'sx-traslados-pendientes-page',
  templateUrl: './traslados-pendientes.component.html',
})
export class TrasladosPendientesPageComponent implements OnInit {

  embarques$: Observable<Embarque[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.LogisticaState>,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.embarques$ = this.store
      .select(fromRoot.getEmbarques)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getEmbarquesLoading);
    this.load();
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction({'transito':'transito'}));
  }

  print(embarque: Embarque) {
    this.service.print(embarque.id)
    .subscribe(res => {
      let blob = new Blob([res], { 
        type: 'application/pdf' 
      });
      let filename = `embarque_${embarque.documento}.pdf`;
      FileSaver.saveAs(blob, filename);
    });
  }

  onRegreso(embarque: Embarque) {
    if(!embarque.regreso) {
      this._dialogService.openConfirm({
        message: 'Registrar regreso del embarue?' + embarque.documento,
        viewContainerRef: this._viewContainerRef,
        title: 'Embarques',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          console.log('Marcando regreso de embarque para: ', embarque);
          this.service
            .registrarRegreso(embarque)
            .subscribe( res => {
              console.log('Regreso registrado...', res);
              this.router.navigate(['/logistica/embarques/transito']);
            }, error=> {

            });
        }
      });
    }
    
  }  

}
