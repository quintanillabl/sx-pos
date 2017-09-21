import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventarios-page',
  templateUrl: './inventarios-page.component.html',
  styleUrls: ['./inventarios-page.component.scss']
})
export class InventariosPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'movimientos', title: 'Movimientos', icon: 'swap_horiz'},
    { route: 'transformaciones', title: 'Transformaciones', icon: 'transform'},
    {route: 'compras', title: 'Compras', icon: 'add_shopping_cart'},
    {route: 'traslados', title: 'Traslados', descripcion: 'Traslados de mercancía', icon:  'local_shipping'},
    {route: 'existencias', title: 'Existencias', icon: 'layers'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
