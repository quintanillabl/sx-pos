import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { TdLoadingService, TdDigitsPipe, TdMediaService } from '@covalent/core';


@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit,  AfterViewInit {

  title = "Operaciones";

  // Esta variable se puede colocar en el store relacionado con contabilidad ui
  navigation = [
    {path: 'home', nombre: 'Inicio', descripcion: 'Compras Dashboard', icon: 'dashboard'},
    {path: 'inventarios', nombre: 'Inventario', descripcion: 'Movimientos de inventario', icon: 'device_hub'},
    {path: 'almacen', nombre: 'Almacén', descripcion: 'Operaciones', icon: 'store'},

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
    this._titleService.setTitle( 'SX-LOGISTICA' );
  }

}
