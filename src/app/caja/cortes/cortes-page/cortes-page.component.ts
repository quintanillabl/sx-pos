import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-cortes-page',
  templateUrl: './cortes-page.component.html'
})
export class CortesPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'cobranza', title: 'Corte cobranza', icon: 'storage'},
    {route: 'fondoFijo', title: 'Fondo fijo', icon: 'storage'},
    {route: 'morralla', title: 'Morralla', icon: 'storage'},
    {route: 'facturacion', title: 'Fichas', icon: 'storage'},

    
    
  ];

  reportes = [];

  constructor() { }

  ngOnInit() {
  }

  runReport(name: string){
    
  }

}
