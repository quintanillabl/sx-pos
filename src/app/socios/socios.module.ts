import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { SharedModule } from '../shared/shared.module';
import { SociosRoutingModule } from './socios-routing.module';
import { SociosListComponent } from './_pages/socios-list/socios-list.component';
import { SociosService } from './services/socios.service';
import { SocioQuickInfoComponent } from './_components/socio-info/socio-info.component';
import { SociosHomeComponent } from './_pages/socios-home/socios-home.component';
import {SociosEffects} from './effects/socios.effects';



@NgModule({
  imports: [
    SharedModule,
    SociosRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('socios', reducers),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([SociosEffects])
  ],
  declarations: [SociosListComponent, SocioQuickInfoComponent, SociosHomeComponent],
  providers: [SociosService]
})
export class SociosModule { }
