import { Component, OnInit, Input } from '@angular/core';

import {SolicitudDeDeposito} from 'app/ventas/models/solicitudDeDeposito';

@Component({
  selector: 'sx-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.scss']
})
export class SolicitudesListComponent implements OnInit {

  @Input() solicitudes: SolicitudDeDeposito[];

  constructor() { }

  ngOnInit() {
  }

}
