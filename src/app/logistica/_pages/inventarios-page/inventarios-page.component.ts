import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-inventarios-page',
  templateUrl: './inventarios-page.component.html',
  styleUrls: ['./inventarios-page.component.scss']
})
export class InventariosPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'movimientos', title: 'Movimientos', icon: 'swap_horiz'},
    {route: 'transformaciones', title: 'Transformaciones', icon: 'transform'},
    {route: 'devoluciones', title: 'Devolución ventas', icon: 'layers_clear'},
    {route: 'coms', title: 'Rec de compras', description: '(COMS)', icon: 'add_shopping_cart'},
    {route: 'decs', title: 'Dev de compras', description: '(DECS)', icon: 'info'},
    {route: 'traslados', title: 'Traslados', descripcion: 'Traslados de mercancía', icon:  'local_shipping'},
    {route: 'existencias', title: 'Existencias', icon: 'layers'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
