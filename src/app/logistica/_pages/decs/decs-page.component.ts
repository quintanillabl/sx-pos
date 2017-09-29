import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-decs-page',
  templateUrl: 'decs-page.component.html',
  styles: [``]
})

export class DecsPageComponent implements OnInit {

  loading$: Observable<any>;

  constructor() { }

  ngOnInit() { }

  search(term) {

  }
}