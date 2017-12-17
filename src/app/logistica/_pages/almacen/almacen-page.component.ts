import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-almacen-page',
  templateUrl: './almacen-page.component.html',
})
export class AlmacenPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'sectores', title: 'Sectores', icon: 'storage'},
    {route: 'conteo', title: 'Conteo de inventario', icon: 'subtitles'},
    {route: 'captura', title: 'Captura de conteo', icon: 'swap_horiz'},
  ];

  reportes = [
    {
      name: 'noCapturados',
      title: 'No Capturados',
      description: 'Productos con existencia no capturados en algun sector',
      icon: 'blur_linear',
      action: 'reporteNoCapturados()'
    },
    {
      name: 'validacionDeConteo',
      title: 'Validación',
      description: '',
      icon: 'blur_linear',
      action: 'reporteDeValidacion()'
    },
    {
      name: 'diferenciasConteo',
      title: 'Diferencias',
      description: '',
      icon: 'blur_linear',
      action: 'reporteDeValidacion()'
    },
    {
      name: 'medidasEspeciales',
      title: 'Medidas E',
      description: '',
      icon: 'blur_linear',
      action: 'reporteDeValidacion()'
    }
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
