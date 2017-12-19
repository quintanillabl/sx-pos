import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { KardexService } from '../../services/kardex.service';
import { Inventario } from 'app/logistica/models/inventario';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { KardexFormComponent } from '@siipapx/logistica/_pages/kardex-page/kardex-form/kardex-form.component';

@Component({
  selector: 'sx-kardex-page',
  templateUrl: './kardex-page.component.html',
  styleUrls: ['./kardex-page.component.scss']
})
export class KardexPageComponent implements OnInit {

  movimientos$: Observable<Inventario[]>;
  search$ = new BehaviorSubject<string>('');
  procesando = false;

  constructor(
    private service: KardexService,
    public dialog: MdDialog,
  ) {
    this.movimientos$ = this.search$
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => {
      this.procesando = true;
      return this.service
      .list(term)
      .delay(200)
      .catch( err => {
        this.handleError(err)
        return Observable.of([])
      })
      .finally( ()=> this.procesando = false);
    });
   }

  ngOnInit() {
    
  }

  search(term: string) {
    this.search$.next(term);
  }

  handleError(error){
    this.procesando = false;
    console.debug('Error: ', error)
  }

  runKardex(){
    const dialogRef = this.dialog.open(KardexFormComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Karded: ', result);
        this.procesando = true;
        this.service.print(result)
        .delay(1000)
        .finally( () => this.procesando = false)
        .subscribe(res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        }, error2 => this.handleError(error2));
      }
    });
  }

}
