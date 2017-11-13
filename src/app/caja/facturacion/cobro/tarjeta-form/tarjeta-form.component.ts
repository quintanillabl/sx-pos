import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import {Cobro, CobroTarjeta} from 'app/models/cobro';

@Component({
  selector: 'sx-tarjeta-form',
  templateUrl: './tarjeta-form.component.html',
  styleUrls: ['./tarjeta-form.component.scss']
})
export class TarjetaFormComponent implements OnInit {

  form: FormGroup;
  cobro: Cobro

  constructor(
    private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<TarjetaFormComponent>,
  ) {
    this.cobro = data.cobro;
  }

  ngOnInit() {
    this.form = this.fb.group({
      visaMaster: [true, [Validators.required]],
      validacion: ['', Validators.required],
    });
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      const cobroTarjeta: CobroTarjeta = {
        debitoCredito: this.cobro.formaDePago === 'TARJETA_DEBITO',
        visaMaster: this.form.get('visaMaster').value as boolean,
        validacion: this.form.get('validacion').value
      }
      this.cobro.tarjeta = cobroTarjeta;
      this.dialogRef.close(this.cobro);
    }
  }

  isTarjetaDeCredito() {
    return this.cobro.formaDePago === 'TARJETA_CREDITO';
  }

}
