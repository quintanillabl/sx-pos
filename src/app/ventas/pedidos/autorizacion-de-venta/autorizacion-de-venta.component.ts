import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'sx-autorizacion-de-venta',
  templateUrl: './autorizacion-de-venta.component.html'
})
export class AutorizacionDeVentaComponent implements OnInit {
  form: FormGroup;

  role: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AutorizacionDeVentaComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      fecha: [{ value: new Date(), disabled: true }, Validators.required],
      tipo: [{ value: data.tipo, disabled: true }, Validators.required],
      solicito: [{ value: data.solicito, disabled: true }, Validators.required],
      autorizo: [null, [Validators.required]],
      comentario: ['', Validators.required],
      usuario: [
        null,
        [Validators.required, this.validarAutorizacion.bind(this)]
      ]
    });
    this.role = data.role;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      ...this.form.getRawValue(),
      fecha: fecha.toISOString()
    };
    this.dialogRef.close(res);
  }

  validarAutorizacion(control: AbstractControl) {
    if (control.value) {
      const user: any = control.value;
      console.log('Validando usuario: ', user);
      return this.hasRole(user, this.role) ? null : { noAutorizado: false };
    }
    return null;
  }

  setUsuario(usuario: any) {
    this.form.get('usuario').setValue(usuario);
    this.form.get('autorizo').setValue(usuario.username);
  }

  private hasRole(user: any, role: string) {
    return user.roles.find(r => r === role) !== null;
  }
}
