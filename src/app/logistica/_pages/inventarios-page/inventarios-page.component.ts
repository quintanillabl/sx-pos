import { Component, OnInit } from '@angular/core';

import { MovimientosService } from 'app/logistica/services/movimientos/movimientos.service';

@Component({
  selector: 'sx-inventarios-page',
  templateUrl: './inventarios-page.component.html',
  styles: ['']
})
export class InventariosPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'movimientos', title: 'Movimientos', icon: 'swap_horiz'},
    {route: 'transformaciones', title: 'Transformaciones', icon: 'transform'},
    {route: 'devoluciones', title: 'Devolución ventas', icon: 'layers_clear'},
    {route: 'decs', title: 'Dev de compras', description: '(DECS)', icon: 'info'},
    {route: 'kardex', title: 'Kardex', descripcion: 'Kardex de productos', icon: 'layers'},
    {route: 'existencias', title: 'Existencias', icon: 'layers'},
  ];
  reportes = [
    {
      name: 'discrepancias',
      title: 'Discrepancias',
      description: 'Discrepancias',
      icon: 'blur_linear',
    },
  ]

  constructor(private service: MovimientosService) { }

  ngOnInit() {
  }

  runReport(report) {
    if (report === 'discrepancias') {
      this.reporteDeDiscrepancias();
    }
  }

  reporteDeDiscrepancias() {
    this.service.reporteDeDiscrepancias()
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

}
