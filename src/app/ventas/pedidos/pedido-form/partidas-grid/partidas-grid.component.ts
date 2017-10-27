import { Component, OnInit, Output,
  EventEmitter, Input, SimpleChange, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ITdDataTableColumn, TdDataTableComponent } from '@covalent/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-pedido-partidas-grid',
  templateUrl: './partidas-grid.component.html',
  styleUrls: ['./partidas-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartidasGridComponent implements OnInit {

  @Output() delete = new EventEmitter();

  @Input() partidas = [];

  @Input() parent: FormGroup;

  // @ViewChild("dataTable") table: TdDataTableComponent;

  // columns: ITdDataTableColumn[] = [
  //   { name: 'producto', label: 'Producto', width: 300},
  //   { name: 'cantidad', label: 'Cantidad', numeric: true,  width: 5},
  //   { name: 'precio', label: 'Precio', numeric: true,  width: 5},
  //   { name: 'importe', label: 'Importe', numeric: true,  width: 5},
  //   { name: 'descuentoImporte', label: 'Descuento', numeric: true,  width: 5},
  //   { name: 'subTotal', label: 'Sub Total', numeric: true,  width: 5},
  // ];

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}
 

  refresh() {
    this.cd.detectChanges();
  }
}
