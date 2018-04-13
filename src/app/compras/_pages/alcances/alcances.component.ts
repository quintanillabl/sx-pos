import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { AlcancesService } from '@siipapx/compras/services/alcances.service';
import { TdLoadingService, TdMediaService } from '@covalent/core';
import { Title } from '@angular/platform-browser';

import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'sx-alcances',
  templateUrl: './alcances.component.html'
})
export class AlcancesComponent implements OnInit, AfterViewInit {
  rows: any[] = [];
  filteredData: any[] = [];
  selectedRows: any[] = [];

  sideNavWidth = '250px';
  filtros = [
    { nombre: 'producto', descripcion: 'Producto' },
    { nombre: 'nombre', descripcion: 'Proveedor' },
    { nombre: 'linea', descripcion: 'Línea' },
    { nombre: 'marca', descripcion: 'Marca' },
    { nombre: 'clase', descripcion: 'Clase' }
  ];

  searchForm: FormGroup;

  constructor(
    private service: AlcancesService,
    private loadingService: TdLoadingService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private titleService: Title
  ) {
    this.searchForm = new FormGroup({
      producto: new FormControl(''),
      nombre: new FormControl(''),
      linea: new FormControl(''),
      marca: new FormControl(''),
      clase: new FormControl('')
    });
    this.searchForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(filtro => {
        this.filtrar();
      });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
    this.titleService.setTitle('SX Alcances');
  }

  ejecutar() {
    this.loadingService.register('procesando');
    this.searchForm.reset();
    this.service
      .list()
      .finally(() => this.loadingService.resolve('procesando'))
      .subscribe(data => {
        this.rows = _.each(data, item => {
          const alcanceMasPedido =
            (_.toNumber(item.pedidoCompraPendte) +
              _.toNumber(item.existencia)) /
            _.toNumber(item.promVta);
          item.alcanceMasPedido = alcanceMasPedido;
          item.porPedir = alcanceMasPedido * _.toNumber(item.promVta);
        });
        this.filteredData = [...this.rows];
      });
  }

  filtrar() {
    let filterData = [...this.rows];
    let filtro: any = _.pickBy(this.searchForm.value, item => !_.isEmpty(item));
    if (filtro.producto) {
      filtro = _.assign(
        {
          clave: filtro.producto,
          descripcion: filtro.producto
        },
        filtro
      );
    }
    const properties = _.keys(filtro);
    let results = [];
    if (properties.length > 0) {
      _.forEach(properties, prop => {
        const term = filtro[prop];
        const filterByPropData = _.filter(filterData, item => {
          const val: string = item[prop];
          if (val) {
            return val.toLowerCase().indexOf(term.toLowerCase()) >= 0;
          }
          return false;
        });
        console.log(`Res by ${prop}: ${filterByPropData.length}`);
        results = [...results, ...filterByPropData];
      });
      console.log('Results: ', results);

      this.filteredData = results;
    } else {
      this.filteredData = [...this.rows];
    }
  }
}
