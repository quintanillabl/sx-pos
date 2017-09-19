import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit {

  @Input() title = "Sin titulo";

  // Esta variable se puede colocar en el store relacionado con contabilidad ui
  navigation = [
    {path: 'home', nombre: 'Inicio', descripcion: 'Compras Dashboard', icon: 'dashboard'},
    {path: 'ordenes', nombre: 'Ordenes de compra', descripcion: 'Alta y mantenimiento de pedidos', icon: 'shopping_basket'},
    {path: 'recepciones', nombre: 'Recepciones de compra', descripcion: 'Registro de recepción de compras', icon: 'flight_land'},
    {path: 'proveedores', nombre: 'Proveedores', descripcion: 'Catálogo de proveedores', icon: 'people'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
