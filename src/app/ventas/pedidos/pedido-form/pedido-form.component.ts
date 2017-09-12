import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Cliente } from "@siipapx/models";

@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {

  cliente$: Observable<Cliente>;

  constructor() { }

  ngOnInit() {
  }

}
