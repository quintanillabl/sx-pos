import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'sx-pedido-cargos-panel',
  templateUrl: './pedido-cargos-panel.component.html',
  styleUrls: ['./pedido-cargos-panel.component.css']
})
export class PedidoCargosPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get comisionTarjeta() {
    return this.parent.get('comisionTarjeta').value;
  }

}
