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
  selector: 'sx-embarque-page',
  templateUrl: './embarque-page.component.html',
})
export class EmbarquePageComponent implements OnInit {

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
      .select(fromRoot.getEmbarquesPorSalir)
      .shareReplay();
    this.loading$ = this.store.select(fromRoot.getEmbarquesLoading);
    this.load();
  }

  search(folio: string) {
    this.store.dispatch(new SearchAction({'documento': folio}));
  }

  load() {
    this.store.dispatch(new SearchAction());
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

  onSalida(embarque: Embarque) {
    console.log('Embarque salida: ', embarque.salida);
    if(!embarque.salida) {
      this._dialogService.openConfirm({
        message: 'Registrar salida de embarue?' + embarque.documento,
        viewContainerRef: this._viewContainerRef,
        title: 'Embarques',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          console.log('Marcando salida de embarque para: ', embarque);
          // this.store.dispatch(new RegistrarSalidaAction(embarque.id));
          this.service
            .registrarSalida(embarque)
            .subscribe( res => {
              console.log('Salida registrada...', res);
              this.router.navigate(['/logistica/embarques/transito']);
            }, error=> {

            });
        }
      });
    }
    
  }  

}
