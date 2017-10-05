import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

import { DecsService } from "app/logistica/services/decs/decs.service";

import * as _ from 'lodash';
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { RecepcionDeCompraDet } from 'app/logistica/models/recepcionDeCompraDet';


@Component({
  selector: 'sx-selector-de-com-dialog',
  templateUrl: './selector-de-com-dialog.component.html',
  styleUrls: ['./selector-de-com-dialog.component.scss']
})
export class SelectorDeComDialogComponent implements OnInit {

  sucursal;
  form: FormGroup;
  loading = false;
  error: any;
  com: RecepcionDeCompra;

  @Input() partivasSelected: RecepcionDeCompraDet[] = [];

  
  selectedRows: any[] = [];

  constructor(
    public dialogRef: MdDialogRef<SelectorDeComDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: DecsService
  ) { 
    this.sucursal = data.sucursal;
    this.com = data.com;
  }

  ngOnInit() {
    this.form = this.fb.group({
      documento: [null, Validators.required],
      sucursal: [{ value: this.sucursal.id, disabled: true}, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      com: this.com,
      partidas: this.selectedRows
    }
    this.dialogRef.close(res);
  }

  buscarCom() {
    if(this.form.valid) {
      this.loading = true;
      const filtro = Object.assign({}, this.form.getRawValue());
      this.service.buscarCom(filtro)
      //.delay(2000)
      .subscribe(
        com => this.selectCom(com),
        response => this.handleError(response));
    }
  }

  selectCom(com) {
    this.com = com;
    console.log('COM seleccionado: ', this.com);
    this.error = null;
    this.loading = false;
  }

  handleError(response) {
    console.error('Error buscando COM ', response);
    if(response.status === 404) {
      this.error = 'COM  no localizado';
    } else if (response.message !== null) {
      this.error = response.message;
    }
    this.loading = false;
  }

  get disponibles() {
    if(this.com === null) return [];

    const partidas = this.com.partidas;
    const filtrados = _.differenceWith(partidas, this.partivasSelected, (val1, val2) => {
      return val1.id === val2.id;
    });
    // console.log('Filtrando con excludes', filtrados);
    return filtrados
  }
  

}
