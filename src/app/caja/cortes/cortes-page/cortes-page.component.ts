import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-cortes-page',
  templateUrl: './cortes-page.component.html'
})
export class CortesPageComponent implements OnInit {

  navigation: Object[] = [
    {route: 'facturacion', title: 'Corte cobranza', icon: 'storage'},
    {route: 'facturacion', title: 'Gastos', icon: 'storage'},
    {route: 'facturacion', title: 'Morralla', icon: 'storage'},
    {route: 'facturacion', title: 'Fichas', icon: 'storage'},

    
    
  ];

  reportes = [];

  constructor() { }

  ngOnInit() {
  }

  runReport(name: string){
    
  }

}
