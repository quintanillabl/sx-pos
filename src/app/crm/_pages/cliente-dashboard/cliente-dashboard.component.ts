import { Component, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TdLoadingService, TdDigitsPipe, TdMediaService, TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-cliente-dashboard',
  templateUrl: './cliente-dashboard.component.html',
  styleUrls: ['./cliente-dashboard.component.scss']
})
export class ClienteDashboardComponent implements OnInit, AfterViewInit { 

  showFooter = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public media: TdMediaService,
    private _titleService: Title,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Cliente ID: ', id);
    });
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._titleService.setTitle( 'SX Cliente' );
  }

  cambiarCliente(): void {
    const config = {
      message: 'Seleccione un cliente',
      viewContainerRef: this._viewContainerRef,
      title: 'Busqueda de cliente', 
      value: '', 
      cancelButton: 'Cancelar', 
      acceptButton: 'Aceptar', 
    };
    this._dialogService.openPrompt(config)
    .afterClosed().subscribe( value => {
      console.log('Buscar nuevo cliente y cambiar la consulta');
    });
  }

}
