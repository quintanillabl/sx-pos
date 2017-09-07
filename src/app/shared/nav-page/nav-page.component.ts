import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sx-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss']
})
export class NavPageComponent implements OnInit {

  @Input() title;

  @Input() color = 'primary';

  @Input() logo = 'assets:siipap-rx2';

  constructor() { }

  ngOnInit() {
  }

}
