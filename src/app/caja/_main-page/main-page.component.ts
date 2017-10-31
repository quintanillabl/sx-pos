import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdLoadingService, TdDigitsPipe, TdMediaService } from '@covalent/core';


@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit,  AfterViewInit {

  navigation = [
    {path: 'facturacion', nombre: 'Facturación', descripcion: 'Facturación y cobro', icon: 'device_hub'},
  ];

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX-CAJA' );
  }

}
