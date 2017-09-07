import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-polizas',
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.scss']
})
export class PolizasComponent implements OnInit {

  navmenu: Object[] = [
    {
      route: 'poliza1', title: 'Poliza 1', description: 'Desc 1', icon:  'receipt'
    },
    {
      route: 'poliza2', title: 'Poliza 2', description: 'Desc 2', icon:  'receipt'
    },
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
