import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

import { FondoFijo } from 'app/caja/models/fondoFijo';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-fondo-fijo-list',
  templateUrl: './fondo-fijo-list.component.html',
  styleUrls: ['./fondo-fijo-list.component.scss']
})
export class FondoFijoListComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'fecha',  label: 'Fecha' },
    { name: 'documento', label: 'Documento' },
    { name: 'descripcion', label: 'Descripción', hidden: false },
    { name: 'solicitud', label: 'Solicitud', sortable: false },
    { name: 'importe', label: 'Importe', numeric: true, format: DECIMAL_FORMAT },
    { name: 'comentario', label: 'Comentario', sortable: false },
  ];

  @Input() movimientos: FondoFijo[] = [];

  filteredData: any[] = this.movimientos;
  filteredTotal: number = this.movimientos.length;
  selectable = true
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'fecha';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private _dataTableService: TdDataTableService
  ) {}

  ngOnInit(): void {
    console.log('Data: ', this.movimientos);
    this.filteredData = this.movimientos;
    this.filteredTotal = this.movimientos.length;
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.movimientos;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

}
