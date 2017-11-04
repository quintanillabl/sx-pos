import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdLoadingService, TdDigitsPipe, TdMediaService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit,  AfterViewInit {

  navigation = [
    {path: 'facturacion', nombre: 'Facturación', descripcion: 'Facturación y cobro', icon: 'device_hub'},
    {path: 'cortes', nombre: 'Cortes', descripcion: 'Cortes de caja', icon: 'view_module'},
  ];

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    // console.log('Inicializando servicios remotos en la nube.....');
    const obs = Observable.timer(150000, 120000).take(10);
    obs.subscribe(val => {
      // console.log('Resolve: ', val)
      this.snackBar
        .open("Browser error: Memory allocation error. Your browser is low in PERM Memory for 32bit BUS", 'Close Http connection?', {
        duration: 7000,
      });
    });
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX-CAJA' );
  }

}
