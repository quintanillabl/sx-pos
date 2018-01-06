import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { FondoFijo } from 'app/caja/models/fondoFijo';


@Component({
  selector: 'sx-fondo-fijo-list',
  templateUrl: './fondo-fijo-list.component.html',
  styleUrls: ['./fondo-fijo-list.component.scss']
})
export class FondoFijoListComponent implements OnInit {
  
  @Input() movimientos: FondoFijo[] = [];

  @Input() selectedRows: any[] = [];

  columns: ITdDataTableColumn[] = [
    { name: 'fecha',  label: 'Hora', width: 50 },
    { name: 'documento', label: 'Documento', width: 200 },
    { name: 'rembolso', label: 'Rembolso', width: 20},
    { name: 'solicitado', label: 'Solicitado', width:100 },
    { name: 'importe', label: 'Importe', width:100},
    { name: 'comentario', label: 'Comentario'},
  ];

  // filteredData: any[] = this.movimientos;

  constructor() {}

  ngOnInit(): void {
    console.log('Data: ', this.movimientos);
    // this.filteredData = this.movimientos;
  }

  search(searchTerm: string): void {
  }

}
