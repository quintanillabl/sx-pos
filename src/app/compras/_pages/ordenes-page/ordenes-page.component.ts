import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { OrdenesService } from "../../services/ordenes.service";
import { Compra } from "app/models";

@Component({
  selector: 'sx-ordenes-page',
  templateUrl: './ordenes-page.component.html',
  styleUrls: ['./ordenes-page.component.scss']
})
export class OrdenesPageComponent implements OnInit {

  ordenes$: Observable<Compra[]>;
  selected: Compra = undefined;

  constructor(
    private ordenesService: OrdenesService
  ) { }

  ngOnInit() {
    this.ordenes$ = this.ordenesService.list();
  }

  onEdit($event) {
    console.log('Edit: ', $event);
  }

  onSelection(compra) {
    console.log('Seleccionando compra: ', compra);
    this.selected = compra;
  }

  onInfo($event) {
    console.log('Seleccionando: ', $event);
  }

}
