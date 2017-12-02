import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, ITdDataTableColumn } from '@covalent/core';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-generadas-page',
  templateUrl: './generadas-page.component.html'
})
export class GeneradasPageComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Documento', numeric: true, width: 10 },
    { name: 'pedido',  label: 'Pedido', numeric: true, width: 10 },
    { name: 'fecha',  label: 'Fecha', width: 10},
    { name: 'nombre',  label: 'Cliente', width: 400},
    { name: 'total',  label: 'Total', width: 10},
    { name: 'saldo',  label: 'Saldo', width: 10},
    { name: 'cuentaPorCobrar',  label: 'CFDI', width: 20},
    { name: 'formaDePago',  label: 'F.Pago'},
  ];

  data: any[] = [];

  constructor(
    private _dataTableService: TdDataTableService,
    private service: CajaService
  ) {}

  ngOnInit(): void {
    this.service.cobradas()
    .subscribe( pendientes => {
      this.data = pendientes;
      }, error => console.log('Error: ', error)
    );
  }

  search(searchTerm: string): void {}

  cobrar(pedido: Venta) {
    console.log('Cobrando venta: ', pedido);
  }

}

