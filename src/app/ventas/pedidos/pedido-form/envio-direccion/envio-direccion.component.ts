import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'sx-envio-direccion',
  templateUrl: './envio-direccion.component.html',
  styleUrls: ['./envio-direccion.component.scss']
})
export class EnvioDireccionComponent implements OnInit {

  direccion;
  form: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<EnvioDireccionComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    //this.direccion = data.direccion;
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      calle: [null, Validators.required],
      numeroExterior: [null, Validators.required],
      numeroInterior: [null],
      colonia: [null, Validators.required],
      municipio: [null, Validators.required],
      estado: [null, Validators.required],
      pais: [{value: 'MEXICO', disabled: true}, Validators.required],
      codigoPostal: [null, Validators.required],
    });
  }

  ngOnInit() {
    // if (this.direccion !== null) {
    //   this.form.patchValue(this.direccion);
    // }
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

}
