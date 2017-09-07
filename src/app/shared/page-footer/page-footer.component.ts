import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromAuth from '../../_auth/reducers';
// import * as fromAuth from '../reducers';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'sx-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  authentication$: Observable<any>

  constructor(store: Store<fromAuth.State>) {
    this.authentication$ = store.select(fromAuth.getAuthentication);
  }

  ngOnInit() {}

}
