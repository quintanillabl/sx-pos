import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-socios-home',
  templateUrl: './socios-home.component.html',
  styleUrls: ['./socios-home.component.scss']
})
export class SociosHomeComponent implements OnInit {

  navmenu: Object[] = [
    {
      route: 'todos',
      title: 'Todos',
      description: 'Catálogo de socios',
      icon:  'people'
    },
    {
      route: 'activos',
      title: 'Activos',
      description: 'Socios usando las instalaciones',
      icon:  'receipt'
    },
    {
      route: 'visitas',
      title: 'Visitas',
      description: 'Visitas',
      icon:  'receipt'
    },
    {
      route: 'vencimientos',
      title: 'Vencimientos',
      description: 'Membresisas por vencer',
      icon:  'receipt'
    },
    {
      route: 'atrasos',
      title: 'Atrasos',
      description: 'Socios con atraso ',
      icon:  'receipt'
    },
    {
      route: 'suspendidos',
      title: 'Suspendidos',
      description: 'Socios suspendidos automaticamente ',
      icon:  'receipt'
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
