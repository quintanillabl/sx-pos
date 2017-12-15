import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {ITdDataTableColumn, TdDialogService} from '@covalent/core';

import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { SolicitudesService } from 'app/traslados/services/solicitudes.service';


const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(3);

@Component({
  selector: 'sx-sol-atencion',
  templateUrl: './sol-atencion.component.html',
  styles: []
})
export class SolAtencionComponent implements OnInit {

  sol$: Observable<SolicitudDeTraslado>;
  loading$: Observable<boolean>;
  procesando = false;

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Producto', width: 60 },
    { name: 'producto.descripcion', label: 'Descripcion', width: 650},
    { name: 'solicitado', label: 'Solicitado', format: DECIMAL_FORMAT, width: 70},
    { name: 'solicitado', label: 'Recibido', format: DECIMAL_FORMAT, width: 70},
    { name: 'comentario', label: 'Comentario', width: 300},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SolicitudesService
  ) { }

  ngOnInit() {
    this.sol$ = this.route.paramMap.switchMap( params => this.service.get(params.get('id')));
  }

  atender(sol: SolicitudDeTraslado) {
    this._dialogService.openConfirm({
      message: `SOL ${sol.documento}`,
      viewContainerRef: this._viewContainerRef,
      title: 'Generar traslado',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doAtender(sol);
      }
    });
  }

  private doAtender(sol: SolicitudDeTraslado) {
    this.procesando = true;
    this.service.atender(sol)
    .finally( () => this.procesando = false)
    .subscribe( () => {
      this.router.navigate(['/traslados/atencion']);
    }, error2 => console.error(error2))
  } 
  
  print(sol: SolicitudDeTraslado) {
    this.procesando = true;
    this.service.print(sol.id)
      .finally( () => this.procesando = false)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.error(error2));
  }

}

