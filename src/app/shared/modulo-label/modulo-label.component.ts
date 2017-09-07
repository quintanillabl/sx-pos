import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'sx-modulo-label',
  templateUrl: './modulo-label.component.html',
  styleUrls: ['./modulo-label.component.scss']
})
export class ModuloLabelComponent implements OnInit {

  moduloName$: Observable<string>;

  constructor() {
    this.moduloName$ = Observable.of('SX-KYO (POS)');
  }

  ngOnInit() {
  }

}
