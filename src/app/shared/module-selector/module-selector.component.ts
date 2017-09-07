import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { Modulo } from '../../_modulos/models/modulo';

@Component({
  selector: 'sx-module-selector',
  templateUrl: './module-selector.component.html',
  styleUrls: ['./module-selector.component.scss']
})
export class ModuleSelectorComponent implements OnInit {

  modulos$: Observable<Modulo[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.modulos$ = this.store.select(fromRoot.getModulos);
    this.store.select(fromRoot.getCurrentModulo).subscribe( modulo => console.log('Modulo: ', modulo));
  }

}
