import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-traslados-page',
  templateUrl: './traslados-page.component.html',
  styleUrls: ['./traslados-page.component.scss']
})
export class TrasladosPageComponent implements OnInit {

  selected = undefined;

  constructor() { }

  ngOnInit() {
  }

}
