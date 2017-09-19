import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-pedido-totales-panel',
  templateUrl: './pedido-totales-panel.component.html',
  styleUrls: ['./pedido-totales-panel.component.css']
})
export class PedidoTotalesPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get importeBruto() {
    return this.parent.get('importeBruto');
  }

}
