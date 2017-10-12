import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-embarques-page',
  templateUrl: './embarques-page.component.html',
})
export class EmbarquesPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'embarques', title: 'Asignaciones', icon: 'storage'},
    {route: 'facturistas', title: 'Transito', icon: 'local_shipping'},
    {route: 'choferes', title: 'Choferes', icon: 'subtitles'},
    {route: 'transportes', title: 'Transportes', icon: 'swap_horiz'},
  ];

  reportes = [
    {
      name: 'reporte1',
      title: 'Reporte 1',
      description: 'Primer reporte de embarques',
      icon: 'blur_linear',
      action: 'reporteNoCapturados()'
    },
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  print() {
    console.log('Imprimir reportes 1: ');
  }

  runReport(report) {
    this._dialogService.openAlert({
      message: 'La impresión de este documento está en desarrollo',
      viewContainerRef: this._viewContainerRef, 
      title: 'Impresíon de reporte: ' + report, 
      closeButton: 'Cancelar', 
    });
  }

  

}
