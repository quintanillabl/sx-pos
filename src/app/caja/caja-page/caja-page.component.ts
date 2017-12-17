import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TdDialogService, TdMediaService} from '@covalent/core';
import {MdDialog} from '@angular/material';
import * as FileSaver from 'file-saver';
import { ReportesService } from 'app/caja/services/reportes.service';
import { VentasDiariasComponent } from '../reportes/ventas-diarias/ventas-diarias.component';
import { AplicacionSaldosComponent } from '../reportes/aplicacion-saldos/aplicacion-saldos.component';
import { CobranzaCamionetaComponent } from '../reportes/cobranza-camioneta/cobranza-camioneta.component';
import { CobranzaEfectivoComponent } from '../reportes/cobranza-efectivo/cobranza-efectivo.component';
import { FacturasPendientesCODComponent } from '../reportes/facturas-pendientes-cod/facturas-pendientes-cod.component';
import { FacturasCobradasComponent } from '../reportes/facturas-cobradas/facturas-cobradas.component';
import { FacturasCanceladasComponent } from '../reportes/facturas-canceladas/facturas-canceladas.component';
import { FacturasPendientesEmbarqueComponent } from '../reportes/facturas-pendientes-embarque/facturas-pendientes-embarque.component';
import { DisponiblesSucursalComponent } from '../reportes/disponibles-sucursal/disponibles-sucursal.component';
import { VentasDiariasCheComponent } from '../reportes/ventas-diarias-che/ventas-diarias-che.component';

@Component({
  selector: 'sx-caja-page',
  templateUrl: './caja-page.component.html'
})
export class CajaPageComponent implements OnInit, AfterViewInit {

  navigation: Object[] = [
    {route: 'facturacion', title: 'Pendientes', icon: 'storage'},
    {route: 'generadas', title: 'Facturas', icon: 'my_library_books'},
    {route: 'cobranzaCod', title: 'Cobranza COD', icon: 'repeat'},
  ];

  reportes = [
    {
      name: 'reporteDeVentasDiarias',
      title: 'Ventas diarias',
      description: 'Ventas diarias',
      icon: 'blur_linear',
    },
    {
      name: 'reporteDeAplicacionSaldos',
      title: 'Aplicación saldos',
      description: 'Aplicación saldos',
      icon: 'blur_linear',
    },
    { 
      name: 'cobranzaCamioneta',
      title: 'Cobranza COD',
      icon: 'blur_linear',
    },
    { 
      name: 'cobranzaEfectivo',
      title: 'Cobranza efectivo',
      icon: 'blur_linear',
    },
    { 
      name: 'facturasPendientesCod',
      title: 'Facturas pendientes COD',
      icon: 'blur_linear',
    },
    { 
      name: 'facturasCobradas',
      title: 'Facturas cobradas',
      icon: 'blur_linear',
    },
    { 
      name: 'facturasCanceladas',
      title: 'Facturas Canceladas',
      icon: 'blur_linear',
    },
    { 
      name: 'facturasPendientesEmbarque',
      title: 'Facturas por embarcar',
      icon: 'blur_linear',
    },
    { 
      name: 'disponiblesPorSucursal',
      title: 'Disponibles por sucursal',
      icon: 'blur_linear',
    },
    { 
      name: 'ventasDiariasChe',
      title: 'Ventas diarias (CHE)',
      icon: 'blur_linear',
    }
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
    if (report === 'reporteDeAplicacionSaldos') {
      this.reporteDeVentasDiarias();
    }
    if (report === 'cobranzaCamioneta') {
      this.cobranzaCamioneta()
    }
    if (report === 'cobranzaEfectivo') {
      this.cobranzaEfectivo()
    }
    if (report === 'facturasPendientesCod') {
      this.facturasPendientesCod()
    }
    if (report === 'facturasCobradas') {
      this.facturasCobradas()
    }
    if (report === 'facturasCanceladas') {
      this.facturasCanceladas()
    }
    if (report === 'facturasPendientesEmbarque') {
      this.facturasPendientesEmbarque();
    }
    if (report === 'disponiblesPorSucursal') {
      this.disponiblesPorSucursal();
    }
    if (report === 'ventasDiariasChe') {
      this.ventasDiariasChe();
    }
  }

  reporteDeVentasDiarias() {
    
    const dialogRef = this.dialog.open(VentasDiariasComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/ventasDiarias', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `VentasDiarias.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
    
  }

  reporteDeAplicacionSaldos() {
    
    const dialogRef = this.dialog.open(AplicacionSaldosComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/aplicacionSaldos', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `AplicacionSaldos.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
    
  }

  cobranzaCamioneta() {
    
    const dialogRef = this.dialog.open(CobranzaCamionetaComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/cobranzaCod', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `CobranzaCamioneta.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
    
  }

  cobranzaEfectivo() {
    const dialogRef = this.dialog.open(CobranzaEfectivoComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/cobranzaEfectivo', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `CobranzaEfectivo.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

  facturasPendientesCod() {
    const dialogRef = this.dialog.open(FacturasPendientesCODComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/facturasPendientesCod', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `facturasPendientesCod.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

  facturasCobradas() {
    const dialogRef = this.dialog.open(FacturasCobradasComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/cobranzaContado', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `facturasCobradas.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

  facturasCanceladas() {
    const dialogRef = this.dialog.open(FacturasCanceladasComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/facturasCanceladas', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `facturasCanceladas.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

  facturasPendientesEmbarque() {
    const dialogRef = this.dialog.open(FacturasPendientesEmbarqueComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/facturasPendientesEmbarque', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `FacturasPendientesEmbarque.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

  disponiblesPorSucursal() {
    const dialogRef = this.dialog.open(DisponiblesSucursalComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/disponiblesSucursal', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `DisponiblesSucursal.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

  ventasDiariasChe() {
    const dialogRef = this.dialog.open(VentasDiariasCheComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('report/ventasDiariasChe', result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `VentasDiariaCHE.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
  }

}
