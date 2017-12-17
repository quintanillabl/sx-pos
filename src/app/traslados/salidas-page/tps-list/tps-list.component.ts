import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-tps-list',
  templateUrl: './tps-list.component.html',
  styles: []
})
export class TpsListComponent implements OnInit {

  @Input() salidas = [];
  
  @Output() print = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
