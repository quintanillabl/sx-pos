import { Component, OnInit } from '@angular/core';
import { AlcancesService } from '@siipapx/compras/services/alcances.service';
import { TdLoadingService } from '@covalent/core';

import * as _ from 'lodash';

@Component({
  selector: 'sx-alcances',
  templateUrl: './alcances.component.html'
})
export class AlcancesComponent implements OnInit {
  rows: any[] = [];
  constructor(
    private service: AlcancesService,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {}

  ejecutar() {
    this.loadingService.register('procesando');
    console.log('Ejecutando alcance: ');
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
          //_.toNumber(item.pedidosCompraPendte);
        });
        console.log('Data: ', data);
      });
  }
}
