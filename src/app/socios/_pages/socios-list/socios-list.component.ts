import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Socio} from '../../models/socio';
import {SociosService} from '../../services/socios.service';
import * as fromSocios from '../../reducers';
import * as actions from '../../actions/socios.actions';



@Component({
  selector: 'sx-socios-list',
  templateUrl: './socios-list.component.html',
  styleUrls: ['./socios-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SociosListComponent implements OnInit {

  socios$: Observable<Socio[]>;
  loading$: Observable<boolean>;
  socio$
  search$ = new BehaviorSubject('');

  constructor(
    private sociosService: SociosService,
    private store: Store<fromSocios.State>
  ) { }

  ngOnInit() {
    /*
    this.socios$ = this.sociosService
      .list()
      .delay(200)
      .shareReplay();
      */
    this.socios$ = this.store.select(fromSocios.getSociosEntities)
    this.socio$ = this.store.select(fromSocios.getSelectedSocio);
    this.loading$ = this.store.select(fromSocios.getSearchLoading)
      .map(loading => !loading); // Small fix for tdLoading component

    this.search$
      .asObservable()
      .debounceTime(800)
      .distinctUntilChanged()
      .do(term => console.log('Buscando: ', term))
      .subscribe( term => this.store.dispatch(new actions.SearchAction(term)) );
  }

  select(socio: Socio) {
    // Using the store
    this.store.dispatch(new actions.SelectAction(socio));
  }

  search(term: string) {
    this.search$.next(term);
    // this.store.dispatch(new actions.SearchAction(term));
  }

}
