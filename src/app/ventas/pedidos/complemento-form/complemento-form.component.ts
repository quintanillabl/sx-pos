import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ComplementoIne, ENTIDADES } from 'app/models/complementoIne';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-complemento-form',
  templateUrl: './complemento-form.component.html'
})
export class ComplementoFormComponent implements OnInit {
  @Input() venta: Venta;
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();
  form: FormGroup;
  entidadForm: FormGroup;
  entidades = ENTIDADES;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    if (this.venta.complementoIne) {
      this.form.patchValue(this.venta.complementoIne);
    }
    this.entidadForm = this.fb.group({
      entidad: [null, Validators.required],
      ambito: [null]
    });
  }

  buildForm() {
    this.form = this.fb.group({
      tipoDeProceso: [null, Validators.required],
      tipoDeComite: [null],
      contabilidad: [null]
    });
  }

  onSubmit() {
    const res = {
      venta: this.venta.id,
      ...this.form.value
    };
    if (this.venta.complementoIne.id) {
      res.id = this.venta.complementoIne.id;
      this.update.emit(res);
    } else {
      this.save.emit(res);
    }
  }

  agregarEntidad() {}
}
