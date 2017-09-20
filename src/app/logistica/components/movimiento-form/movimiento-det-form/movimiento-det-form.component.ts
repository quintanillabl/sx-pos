import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MovimientoDet } from "@siipapx/logistica/models/movimientoDet";

@Component({
  selector: 'sx-movimiento-det-form',
  templateUrl: './movimiento-det-form.component.html',
  styleUrls: ['./movimiento-det-form.component.scss']
})
export class MovimientoDetFormComponent implements OnInit {
  
  form: FormGroup;

  @Output() insert = new EventEmitter<MovimientoDet>();
  
  @ViewChild('productField') 
  private productField;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      producto: [null, Validators.required],
      cantidad: [0, Validators.min(1)],
      comentario: [null, Validators.maxLength(100)],
      sw2: ['SIIPAPX'] // small fix temporal
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const entity = this.prepareEneity()
      this.insert.emit(entity);
      this.reset();
    }
  }

  prepareEneity() {
    const entity = Object.assign({}, this.form.value);
    entity.cantidad = entity.cantidad * -1;
    return entity;
  }

  reset() {
    this.form.reset();
    this.productField.focus();
  }

}
