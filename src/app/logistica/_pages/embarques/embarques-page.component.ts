import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import * as FileSaver from 'file-saver'; 
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';

@Component({
  selector: 'sx-embarques-page',
  templateUrl: './embarques-page.component.html',
})
export class EmbarquesPageComponent implements OnInit {

  
  navigation: Object[] = [
    {route: 'embarques', title: 'Asignaciones', icon: 'storage'},
    {route: 'transito', title: 'Transito', icon: 'local_shipping'},
    {route: 'facturasEnTransito', title: 'FACS en transito', icon: 'trafficx'},
    {route: 'facturasPendientes', title: 'FACS pendientes', icon: 'alarm'},
    {route: 'traslados', title: 'Traslados', icon: 'settings_ethernet'},
    {route: 'devoluciones', title: 'Devoluciones', icon: 'sync_disabled'},
    
    // {route: 'choferes', title: 'Choferes', icon: 'subtitles'},
    // {route: 'transportes', title: 'Transportes', icon: 'swap_horiz'},
  ];

  reportes = [
    {
      name: 'entregasPorChofer',
      title: 'Entregas por Chofer',
      description: 'Bitacora de entregas por chofer',
      icon: 'blur_linear',
      action: 'reporteDeEntregasPorChofer()'
    },
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: EmbarqueService
  ) { }

  ngOnInit() {
  }

  
  runReport(report) {
    // this._dialogService.openAlert({
    //   message: `Reporte ${report} en desarrollo`,
    //   viewContainerRef: this._viewContainerRef, 
    //   title: 'Impresíon de reporte: ' + report, 
    //   closeButton: 'Cancelar', 
    // });
    if(report ==='entregasPorChofer'){
      this.reporteDeEntregasPorChofer();
    }
  }

  reporteDeEntregasPorChofer() {
    this.service.reporteDeEntregasPorChofer({})
    .subscribe(res => {
      let blob = new Blob([res], { 
        type: 'application/pdf' 
      });
      let filename = `EntregasPorChofer.pdf`;
      FileSaver.saveAs(blob, filename);
    });
  }


  

}
