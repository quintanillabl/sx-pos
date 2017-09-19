import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-pedido-toolbar',
  template: `
    <div layout="row" layout-align="start center" class="pad-left-sm pad-right-sm" layout-padding>
      <span  class="push-left-sm">
        <span class="md-title">Title here</span>
      </span>
      <span flex></span>
      <span>
        <button md-icon-button ><md-icon>search</md-icon></button>
        <button md-icon-button [mdMenuTriggerFor]="toolbarMenu"><md-icon>more_vert</md-icon></button>
        <md-menu #toolbarMenu="mdMenu">
          <button md-menu-item>
            <md-icon>settings</md-icon>
            <span>Configuración</span>
          </button>
          <button md-menu-item (click)="addCliente.emit()"  >
              <md-icon>person_add</md-icon>
              <span>Registrar cliente</span>
            </button>
        </md-menu>
      </span>
    </div>
  `,
  styles: []
})
export class PedidoToolbarComponent implements OnInit {

  @Output() addCliente = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  


}
