import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';

import * as _ from 'lodash'; 

@Component({
  selector: 'sx-devolucion-partidas',
  templateUrl: 'devolucion-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevolucionPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave', label: 'Producto', tooltip: 'Clave del producto', sortable: true },
    { name: 'producto.descripcion', label: 'Descripción', width: 350 },
    { name: 'ventaDet.cantidad', label: 'Vendido', numeric: true,  width: { min: 50, max: 100 }},
    { name: 'cantidad', label: 'Por devolver', numeric: true,  width: { min: 50, max: 100 }},
  ];

  constructor(
    private _dialogService: TdDialogService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  scrollToStart() {
    console.log('Scroll to start');
  }
  scrollToLast() {

  }

  editar(index, row) {
    //this.edit.emit(row);
    this._dialogService.openPrompt({
      message: 'Registre la cantidad a devolver? ',
      value: row.cantidad,
    }).afterClosed().subscribe((value: any) => {
      
      if (value !== undefined ) {
        const cantidad = _.toSafeInteger(value);
        const e = { row: index, cantidad: cantidad};
        this.edit.emit(e);
      }
    });
    
  }

  delete(index: number){
    this.remove.emit(index);
  }
}