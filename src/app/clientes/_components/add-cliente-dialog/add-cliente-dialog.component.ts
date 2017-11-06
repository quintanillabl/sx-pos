import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'sx-add-cliente-dialog',
  templateUrl: './add-cliente-dialog.component.html',
  styleUrls: ['./add-cliente-dialog.component.css']
})
export class AddClienteDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AddClienteDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [null, [Validators.required, Validators.maxLength(20)]],
      rfc: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      clave: ['TEST', Validators.required],
      email: [null],
      direccion: this.fb.group({
        calle: [null, Validators.required],
        numeroExterior: [null, Validators.required],
        numeroInterior: [null],
        colonia: [null, Validators.required],
        municipio: [null, Validators.required],
        estado: [null, Validators.required],
        pais: [{value: 'MEXICO', disabled: true}, Validators.required],
        codigoPostal: [null, Validators.required],
      })
    });
  }

  cancelar() {
    this.dialogRef.close('CANCELADO');
  }

  onSubmit() {
    if (this.form.valid) {
      const cliente = {
        ... this.form.getRawValue()
      }
      this.dialogRef.close(cliente);
    }
  }

  get generalesLabel(){
    return this.form.get('nombre').value ? this.form.get('nombre').value : 'Datos generales'
  }

  get direccion() {
    return this.form.get('direccion').value;
  }

  reset() {
    this.form.reset();
  }



}
