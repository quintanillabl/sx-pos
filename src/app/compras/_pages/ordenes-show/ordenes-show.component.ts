import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import { ITdDataTableColumn, TdDialogService, TdLoadingService } from "@covalent/core";


import { Compra } from "app/models";
import { OrdenesService } from 'app/compras/services/ordenes.service';



const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);
const NUMBER_FORMAT: (v: any) => any = (v: number) => v;

@Component({
  selector: 'sx-ordenes-show',
  templateUrl: './ordenes-show.component.html',
  styleUrls: ['./ordenes-show.component.scss']
})
export class OrdenesShowComponent implements OnInit {

  orden$: Observable<Compra>;

  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 70 },
    { name: 'producto.descripcion', label: 'Descripcion', width:350},
    { name: 'solicitado', label: 'Solicitado', width: 70, numeric: true, format: DECIMAL_FORMAT},
    { name: 'recibido', label: 'Recibido', width: 70, numeric: true, format: DECIMAL_FORMAT},
    { name: 'comentario', label: 'Comentario', width: 400},
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private loadingService: TdLoadingService,
    private router: Router,
    private service: OrdenesService,
    
  ) { }

  ngOnInit() {
    
  }

  onDelete(compra: Compra) {
    this._dialogService.openConfirm({
      message: `Compra: ${compra.folio}?`,
      viewContainerRef: this._viewContainerRef,
      title: 'Confirmar eliminación',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // this.store.dispatch(new Compras.DeleteAction(compra.id));
        // this.router.navigate(['/compras/ordenes/']);
        this.doDelete(compra);
      } else {
        
      }
    });
  }

  
  doDelete(compra: Compra) {
    this.loadingService.register('processing');
    this.service
    .delete(compra.id)
    .delay(1000)
    .subscribe( 
      () => { 
        console.log('DELTE SUCCESS', compra);
        this.loadingService.resolve('processing');
        this.router.navigate(['/compras/ordenes'])
      },
      response => {
        this.handlePostError(response);
        this.loadingService.resolve('processing');
      }
    );
  }

  private handlePostError(response){
    console.log('Error en compras: ', response);
  }

  print(compra: Compra) {
    this.procesando = true;
    this.service.print(compra)
      .delay(1000)
      .finally( ()=> this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.procesando = false;
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.log(error2));
  }

}
