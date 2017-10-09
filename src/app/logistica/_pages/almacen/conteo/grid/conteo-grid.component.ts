import { Component, OnInit, Input } from '@angular/core';

import {Conteo} from 'app/logistica/models/conteo';

@Component({
  selector: 'sx-conteo-grid',
  templateUrl: './conteo-grid.component.html',
  styleUrls: ['./conteo-grid.component.scss']
})
export class ConteoGridComponent implements OnInit {

  @Input() conteos: Conteo[] = [];

  constructor() { }

  ngOnInit() {
  }

}
