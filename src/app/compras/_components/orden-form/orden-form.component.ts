import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Compra, Sucursal } from 'app/models';

@Component({
  selector: 'sx-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.scss']
})
export class OrdenFormComponent implements OnInit {

  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<Compra>();

  @Input() fecha = new Date();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      proveedor: [null, Validators.required],
      sucursal: [{value:this.sucursal, disabled: true}],
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      entrega: [new Date(), Validators.required],
      especial: [false],
      partidas: this.fb.array([]),
      comentario: ['', Validators.maxLength(100)]
    });
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onSubmit() {
    if(this.form.valid) {
      const compra = this.prepareEntity();
      this.save.emit(compra);
    }
  }

  private prepareEntity() {
    const res = this.form.getRawValue();
    return {
      ...res
    };
  }

}
