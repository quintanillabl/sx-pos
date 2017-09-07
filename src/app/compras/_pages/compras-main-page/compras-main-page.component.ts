import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-compras-main-page',
  templateUrl: './compras-main-page.component.html',
  styleUrls: ['./compras-main-page.component.scss']
})
export class ComprasMainPageComponent implements OnInit {

  
  navmenu: Object[] = [
    {route: 'ordenes', title: 'Compras', description: 'Ordenes de compra', icon:  'store', tooltip: 'Ordenes de compras'},
    {route: 'alcance', title: 'Alcances', icon: 'repeat'},
    {route: 'recepciones', title: 'Recepciones', icon: 'flight_land'},
    {route: 'existencias', title: 'Existencias', icon: 'layers'},
    {route: 'dashboard', title: 'Tableros', icon: 'dashboard'},
    {route: 'catalogos', title: 'Catálogos', icon: 'view_quilt'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
