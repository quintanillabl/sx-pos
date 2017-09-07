import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  navmenu: Object[] = [
    {
      route: 'catalogo',
      title: 'Catálogo',
      description: 'Catálogo de cuentas',
      icon:  'people'
    },
    {
      route: 'saldos',
      title: 'Saldos',
      description: 'Saldos de cuentas',
      icon:  'receipt'
    },
    {
      route: '../balanza',
      title: 'Balanza',
      description: 'Balanza general',
      icon:  'receipt'
    },
    {
      route: 'sat',
      title: 'SAT',
      description: 'Catálogos del SAT',
      icon:  'receipt'
    },
    {
      route: 'reportes',
      title: 'Reportes',
      description: 'Reportes rinancieros',
      icon:  'receipt'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
