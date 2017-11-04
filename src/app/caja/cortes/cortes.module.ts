import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CortesPageComponent } from './cortes-page/cortes-page.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [CortesPageComponent],
})
export class CortesModule { }
