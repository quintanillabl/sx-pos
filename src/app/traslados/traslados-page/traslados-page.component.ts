import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TdMediaService} from '@covalent/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'sx-traslados-page',
  templateUrl: './traslados-page.component.html',
  styleUrls: ['./traslados-page.component.scss']
})
export class TrasladosPageComponent implements AfterViewInit {

  @Input() title = 'SX-Traslados';

  @Input() drawerTitle = 'Opciones';

  @Input() navigationRoute = '/';

  @Input() logo = 'assets:siipap-rx2';

  @Input() sidenavWidth = '300px';

  navigation = [
    {route: 'solicitudes', title: 'Solicitudes', descripcion: 'Solicitude de material', icon: 'shopping_basket'},
    {route: 'atencion', title: 'Atención', descripcion: 'Solicitudes por atender', icon: 'account_circle'},
    {route: 'recepciones', title: 'TPEs', descripcion: 'Entrada de traslados', icon: 'flight_land'},
    {route: 'salidas', title: 'TPSs', descripcion: 'Salidas de traslados', icon: 'flight_takeoff'},
    // {route: 'historico', title: 'Histórico', descripcion: 'Registro de traslados de material', icon:  'insert_chart'},
  ];

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
  ) { }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX-Traslados' );
  }

}
