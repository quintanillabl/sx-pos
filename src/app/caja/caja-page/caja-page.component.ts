import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TdDialogService, TdMediaService} from '@covalent/core';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'sx-caja-page',
  templateUrl: './caja-page.component.html',
  styleUrls: ['./caja-page.component.scss']
})
export class CajaPageComponent implements OnInit, AfterViewInit {

  navigation: Object[] = [
    {route: 'facturacion', title: 'Facturación', icon: 'storage'},
  ];

  reportes = [
    {
      name: 'reporte1',
      title: 'Reporte 1',
      description: 'Reporte de caja 1',
      icon: 'blur_linear',
      action: 'reporteDeEntregasPorChofer()'
    },
  ];

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    private _dialogService: TdDialogService,
    public dialog: MdDialog,
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
    /*if (report === 'entregasPorChofer') {
      this.reporteDeEntregasPorChofer();
    }*/
  }

  reporteDeEntregasPorChofer() {
    /*
    const dialogRef = this.dialog.open(EntregaPorChoferComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.reporteDeEntregasPorChofer(result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `EntregasPorChofer.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
    */
  }

}
