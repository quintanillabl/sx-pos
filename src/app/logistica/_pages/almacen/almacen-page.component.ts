import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
