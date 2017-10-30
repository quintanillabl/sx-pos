import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-pedido-envio-panel',
  templateUrl: './pedido-envio-panel.component.html',
  styleUrls: ['./pedido-envio-panel.component.css']
})
export class PedidoEnvioPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
