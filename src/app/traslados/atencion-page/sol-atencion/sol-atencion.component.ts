import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {ITdDataTableColumn, TdDialogService} from '@covalent/core';
import {MdDialog} from '@angular/material';

import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { SolicitudesService } from 'app/traslados/services/solicitudes.service';
import { AtenderSolComponent } from '@siipapx/traslados/atencion-page/atender-sol/atender-sol.component';


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
  choferes = [];

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
    public dialog: MdDialog,
    private service: SolicitudesService
  ) { }

  ngOnInit() {
    this.sol$ = this.route.paramMap.switchMap( params => this.service.get(params.get('id')));
    this.service.choferes().subscribe( data => {
      this.choferes = data;
    });
  }

  atender(sol: SolicitudDeTraslado) {
    const dialogRef = this.dialog.open(AtenderSolComponent, {
      data: {
        choferes: this.choferes
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doAtender(sol, result.chofer, result.comentario)
      }
    });
  }

  private doAtender(sol: SolicitudDeTraslado, chofer, comentario) {
    this.procesando = true;
    this.service.atender(sol, chofer, comentario)
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

