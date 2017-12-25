import {Component, HostListener, Inject, OnInit} from '@angular/core';
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
      nombre: [null, [Validators.required, Validators.maxLength(255)]],
      rfc: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      clave: ['PENDIENTE', Validators.required],
      email: [null, Validators.required],
      direccion: this.fb.group({
        calle: [null, Validators.required],
        numeroExterior: [null, Validators.required],
        numeroInterior: [null],
        colonia: [null, Validators.required],
        municipio: [null, Validators.required],
        estado: [null, Validators.required],
        pais: [{value: 'MEXICO', disabled: true}, Validators.required],
        codigoPostal: [null, Validators.required],
      }),
      telefono1: [null],
      telefono2: [null],
      celular: [null],
      fax: [null],
      mail: [null],
      www: [null]
    });
  }



  cancelar() {
    this.dialogRef.close('CANCELADO');
  }

  onSubmit() {
    if (this.form.valid) {
      const cliente = {
        medios: this.buildMediosObject(),
        ... this.form.getRawValue()
      }
      // console.log('Cliente: ', cliente);
      this.dialogRef.close(cliente);
    }
  }

  private buildMediosObject(): Array<any> {
    const medios = [];
    const telefono1 = this.form.get('telefono1').value;
    const telefono2 = this.form.get('telefono2').value;
    const cfdiMail = this.form.get('email').value;
    if (telefono1 ) {
      medios.push({tipo: 'TEL', descripcion: telefono1, comentario: 'TELEFONO 1'})
    }
    if (telefono2 ) {
      medios.push({tipo: 'TEL', descripcion: telefono2, comentario: 'TELEFONO 2'})
    }
    if (cfdiMail ) {
      medios.push({tipo: 'MAIL', descripcion: cfdiMail, comentario: 'CFDI Mail', cfdi: true})
    }
    return medios;
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.code === 'F7') {
      console.log('Interceptando F7');
    }
  }



}
