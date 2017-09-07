import {Component, Input} from '@angular/core';

@Component({
  selector: 'sx-page-toolbar',
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.scss']
})
export class PageToolbarComponent {

  @Input() title;

  constructor() { }

}
