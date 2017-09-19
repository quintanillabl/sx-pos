import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Movimiento } from "app/logistica/models/movimiento";


@Component({
  selector: 'sx-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.scss']
})
export class MovimientoFormComponent implements OnInit {

  @Output() save = new EventEmitter<Movimiento>();
  
  form: FormGroup;
  nombre$: Observable<string>;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      sucursal: [{value: this.sucursal, disabled: 'true' }],
      fecha: [{ value: new Date(), disabled: 'true'}],
      tipo: ['CIS',Validators.required],
      comentario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  onSave() {
    if( this.form.valid) {
      const entity = this.preparEntity();
      this.save.emit(entity);
    }
  }

  get sucursal() {
    return {
      id: '402880fc5e4ec411015e4ec64e70012e',
      nombre: 'TACUBA'
    }
  }

  preparEntity() {
    const entity = this.form.getRawValue();
    return entity;
  }

  cancel() {
    history.back();
  }
  
  reset() {
    this.form.reset();
  }

}
