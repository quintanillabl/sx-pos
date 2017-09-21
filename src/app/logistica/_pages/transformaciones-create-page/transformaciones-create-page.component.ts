import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transformaciones-create-page',
  templateUrl: './transformaciones-create-page.component.html',
  styleUrls: ['./transformaciones-create-page.component.scss']
})
export class TransformacionesCreatePageComponent implements OnInit {

  tipos = ['RECLASIFICACION', 'TRANSFORMACION'];

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      step1Form: this.fb.group({
        sucursal: [{value: this.sucursal, disabled: 'true' }],
        fecha: [{ value: new Date(), disabled: 'true'}],
        tipo: [null,Validators.required],
        porInventario: [false, Validators.required],
        comentario: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      }),
      partidas: this.fb.array([])
    });
  }

  get sucursal() {
    return {
      id: '402880fc5e4ec411015e4ec64e70012e',
      nombre: 'TACUBA'
    }
  }

  get fecha() {
    return new Date()
  }

  get step1Form() {
    return this.form.get('step1Form');
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  insertPartida(partida) {
    console.log('Insertando partida: ', partida);
    this.partidas.push(new FormControl(partida));
  }

  removePartida(index: number){
    console.log('Eliminando partida: ', index);
    this.partidas.removeAt(index);
  }

}
