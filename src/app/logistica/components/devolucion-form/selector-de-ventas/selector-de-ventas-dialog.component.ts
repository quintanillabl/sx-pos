import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
// import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

import { DevolucionesService } from "app/logistica/services/devoluciones/devoluciones.service";
import { Venta } from "app/models";


@Component({
  selector: 'sx-selector-de-ventas-dialog',
  templateUrl: './selector-de-ventas-dialog.component.html',
  styleUrls: ['./selector-de-ventas-dialog.component.scss']
})
export class SelectorDeVentasDialogComponent implements OnInit {

  sucursal;
  form: FormGroup;
  loading = false;
  error: any;
  venta: Venta;

  
  selectedRows: any[] = [];

  constructor(
    public dialogRef: MdDialogRef<SelectorDeVentasDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: DevolucionesService
  ) { 
    this.sucursal = data.sucursal;
  }

  ngOnInit() {
    this.form = this.fb.group({
      documento: [null, Validators.required],
      // fecha: [new Date(), Validators.required],
      sucursal: [{ value: this.sucursal.id, disabled: true}, Validators.required],
      tipo: ['CRE', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      venta: this.venta,
      partidas: this.selectedRows
    }
    this.dialogRef.close(res);
  }

  buscarVenta() {
    if(this.form.valid) {
      this.loading = true;
      const filtro = Object.assign({}, this.form.getRawValue());
      this.service.buscarVenta(filtro)
      //.delay(2000)
      .subscribe(
        venta => this.selectVenta(venta),
        response => this.handleError(response));
    }
  }

  selectVenta(venta) {
    this.venta = venta;
    this.error = null;
    this.loading = false;
  }

  handleError(response) {
    console.error('Error buscando venta ', response);
    if(response.status === 404) {
      this.error = 'Venta no localizada';
    } else if (response.message !== null) {
      this.error = response.message;
    }
    this.loading = false;
  }
  

}
