import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-recepciones-page',
  templateUrl: './recepciones-page.component.html',
  styleUrls: ['./recepciones-page.component.scss']
})
export class RecepcionesPageComponent implements OnInit {

  navigation = [
    {route: 'pendientes', title: 'Pendientes', description: 'Compras pendientes de ingresar', icon: 'watch'},
    {route: 'entradas', title: 'Entradas', description: 'Recepciones de compra registradas', icon: 'done'},
    {route: 'devoluciones', title: 'Devoluciones', description: 'Devoluciones de mercancía', icon: 'assignment_return'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
