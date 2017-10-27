import { Component, OnInit, Input } from '@angular/core';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-pedidos-pendientes-list',
  templateUrl: './pendientes-list.component.html',
  styleUrls: ['./pendientes-list.component.scss']
})
export class PendientesListComponent implements OnInit {

  @Input() pedidos: Venta[];

  constructor() { }

  ngOnInit() {
  }

}
