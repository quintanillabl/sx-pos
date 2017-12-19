import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-tpe-list',
  templateUrl: './tpe-list.component.html'
})
export class TpeListComponent implements OnInit {

  @Input() entradas = [];
  
  @Output() print = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
