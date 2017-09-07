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

  constructor(
    private ordenesService: OrdenesService
  ) { }

  ngOnInit() {
    this.ordenes$ = this.ordenesService.list();
  }

  onEdit($event) {
    console.log('Edit: ', $event);
  }

  onInfo($event) {
    console.log('Seleccionando: ', $event);
  }

}
