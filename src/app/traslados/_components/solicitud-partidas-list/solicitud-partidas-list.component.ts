import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-solicitud-partidas-list',
  templateUrl: './solicitud-partidas-list.component.html',
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class SolicitudPartidasListComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas = [];

  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  delete(index: number) {
    this.remove.emit(index);
  }

}
