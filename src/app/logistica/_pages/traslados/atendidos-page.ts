import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sx-trs-atendidos-page',
  template: `
    <md-card >
      <div layout="row" layout-align="start center" class="pad-left-sm pad-right-sm">
      <span *ngIf="!searchBox.searchVisible" class="push-left-sm">
        <span class="md-title">Por Atender</span>
      </span>
        <td-search-box #searchBox backIcon="arrow_back" class="push-right-sm"
                       placeholder="Buscar "  flex>
        </td-search-box>
        <span>
        <button md-icon-button ><md-icon>add</md-icon></button>
      </span>
      </div>

      <md-divider></md-divider>
      <md-card-content class="will-load">
      </md-card-content>
    </md-card>
  `
})
export class AtendidosPageComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
  }

}
