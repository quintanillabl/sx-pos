import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { SectoresService } from '@siipapx/logistica/services/sectores/sectores.service';

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
    },
    {
      name: 'productosSinSector',
      title: 'Prods sin sector',
      description: '',
      icon: 'blur_linear',
      action: 'reporteProductosSinSector()'
    }
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private service: SectoresService,
  ) { }

  ngOnInit() {
  }

  print() {
    console.log('Imprimir reportes 1: ');
  }

  runReport(report) {
    if (report === 'productosSinSector') {
      this.reporteProductosSinSector();
    }
  }

  reporteProductosSinSector() {
    this.service.productosSinSector()
    .subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  

}
