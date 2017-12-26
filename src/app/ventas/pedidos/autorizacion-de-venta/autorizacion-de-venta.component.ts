import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-autorizacion-de-venta',
  templateUrl: './autorizacion-de-venta.component.html',
  styleUrls: ['./autorizacion-de-venta.component.scss']
})
export class AutorizacionDeVentaComponent implements OnInit {


  form: FormGroup

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AutorizacionDeVentaComponent>,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      tipo: [{value: data.tipo, disabled: true}, Validators.required],
      solicito: [{value: data.solicito, disabled: true}, Validators.required],
      autorizo: [null, Validators.required],
      comentario: ['', Validators.required],
      usuario: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      ... this.form.getRawValue(),
      fecha: fecha.toISOString(),
    };
    this.dialogRef.close(res);
  }

  setUsuario(usuario: any) {
    this.form.get('usuario').setValue(usuario);
    this.form.get('autorizo').setValue(usuario.username);
  }

}
