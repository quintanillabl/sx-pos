import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit {

  // Esta variable se puede colocar en el store relacionado con contabilidad ui
  navigation = [
    {path: '', nombre: 'Inicio', descripcion: 'Inicio del sistema', icon: 'home'},
    {path: 'home', nombre: 'Dashboard', descripcion: 'Tesorería dashboard', icon: 'dashboard'},
    {path: 'cuentas', nombre: 'Cuentas bancarias', descripcion: 'Cuentas bancarias', icon: 'account_balance_wallet'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
