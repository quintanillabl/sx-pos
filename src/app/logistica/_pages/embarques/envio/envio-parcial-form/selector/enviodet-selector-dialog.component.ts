import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


import * as _ from 'lodash';

import { VentaDet } from 'app/models/ventaDet';
import {Envio} from 'app/logistica/models/envio';
import {ITdDataTableColumn} from '@covalent/core';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);


@Component({
  selector: 'sx-enviodet-selector-dialog',
  templateUrl: './enviodet-selector-dialog.component.html',
  styleUrls: ['./enviodet-selector-dialog.component.scss']
})
export class EnviodetSelectorDialogComponent implements OnInit {

  form: FormGroup;

  partidasDeVenta: VentaDet[] = [];

  envio: Envio;


  selectedRows = [];

  columns: ITdDataTableColumn[] = [
    { name: 'producto.clave',  label: 'Clave', sortable: true, width: 40, numeric: false },
    { name: 'producto.descripcion',  label: 'Descripcion', sortable: true, width: 320, numeric: false },
    { name: 'cantidad',  label: 'Devuelto', sortable: true, width: 40, numeric: true, format: NUMBER_FORMAT },
  ];

  constructor(
    public dialogRef: MdDialogRef<EnviodetSelectorDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.partidasDeVenta = data.partidasDeVenta;
    this.envio = data.envio;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      partidas: this.selectedRows.map( item => {
        return {
         producto: item.producto,
          ventaDet: item,
          cantidad: item.cantidad * -1
        };
      })
    }
    this.dialogRef.close(res);
  }

  get disponibles(){
    return this.partidasDeVenta
  }


}
