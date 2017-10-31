import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TdDialogService, TdMediaService} from '@covalent/core';
import {MdDialog} from '@angular/material';
import * as FileSaver from 'file-saver';
import { ReportesService } from 'app/caja/services/reportes.service';
import { VentasDiariasComponent } from '../reportes/ventas-diarias/ventas-diarias.component';

@Component({
  selector: 'sx-caja-page',
  templateUrl: './caja-page.component.html'
})
export class CajaPageComponent implements OnInit, AfterViewInit {

  navigation: Object[] = [
    {route: 'facturacion', title: 'Facturación', icon: 'storage'},
  ];

  reportes = [
    {
      name: 'reporteDeVentasDiarias',
      title: 'Ventas diarias',
      description: 'Ventas diarias',
      icon: 'blur_linear',
    },
  ];

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    private _dialogService: TdDialogService,
    public dialog: MdDialog,
    public service: ReportesService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX-CAJA' );
  }

  runReport(report) {
    console.log('Ejecutando reporte: ', report);
    if (report === 'reporteDeVentasDiarias') {
      this.reporteDeVentasDiarias();
    } 
  }

  reporteDeVentasDiarias() {
    
    const dialogRef = this.dialog.open(VentasDiariasComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('ventas/reportes/ventasDiarias', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `EntregasPorChofer.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
    
  }

}
