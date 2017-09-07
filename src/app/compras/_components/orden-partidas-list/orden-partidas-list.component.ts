import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-orden-partidas-list',
  templateUrl: './orden-partidas-list.component.html',
  styles: []
})
export class OrdenPartidasListComponent implements OnInit {


  @Input() parent: FormGroup;

  @Input() partidas = [];

  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  doRemove(index: number) {

  }

}
