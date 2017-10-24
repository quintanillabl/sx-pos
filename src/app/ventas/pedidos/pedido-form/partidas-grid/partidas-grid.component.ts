import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';


const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'sx-pedido-partidas-grid',
  templateUrl: './partidas-grid.component.html',
  styleUrls: ['./partidas-grid.component.scss']
})
export class PartidasGridComponent implements OnInit, OnChanges {
  

  @Output() insert = new EventEmitter();

  @Input() partidas = [];

  columns: ITdDataTableColumn[] = [
    { name: 'producto', label: 'Producto', width: 300},
    { name: 'cantidad', label: 'Cantidad', numeric: true,  width: 5},
    { name: 'precio', label: 'Precio', numeric: true,  width: 5},
    { name: 'importe', label: 'Importe', numeric: true,  width: 5},
    { name: 'descuento', label: 'Descuento', numeric: true,  width: 5},
    { name: 'subTotal', label: 'Sub Total', numeric: true,  width: 5},
    // { name: 'cortado', label: 'Corte', numeric: true,  width: 5},
    // { name: 'vale', label: 'Vale', width: 5},
  ];
  
  filteredData: any[] = this.partidas;
  filteredTotal: number = this.partidas.length;
  sortBy: string = 'producto.clave';
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService) {}

  ngOnInit() {
    
  }

  ngOnChanges(changes): void {
    if(changes.partidas && !changes.firstChange) {
     this.filteredData = changes.currentValue;
     this.filter();
    }
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
    let newData: any[] = this.partidas;
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
