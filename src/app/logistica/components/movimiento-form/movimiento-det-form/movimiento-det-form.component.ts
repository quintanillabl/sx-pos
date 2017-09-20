import { Component, Input, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MovimientoDet } from "@siipapx/logistica/models/movimientoDet";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'sx-movimiento-det-form',
  templateUrl: './movimiento-det-form.component.html',
  styleUrls: ['./movimiento-det-form.component.scss']
})
export class MovimientoDetFormComponent implements OnInit, OnDestroy {
  

  form: FormGroup;

  @Input() parent: FormGroup;

  @Output() insert = new EventEmitter<MovimientoDet>();
  
  @ViewChild('productField') 
  private productField;

  tipos = ['MATERIAL_EMPAQUE', 'PAPELERIA', 'PUBLICIDAD_PROPAGANDA', 'NO_DEDUSIBLE'];
  
  subsctiption: Subscription;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      producto: [null, Validators.required],
      cantidad: [0, Validators.min(1)],
      comentario: [null, Validators.maxLength(100)],
      sw2: ['SIIPAPX'], // small fix temporal
      tipoCIS: [{value: null, disabled: true}]
    });

    this.subsctiption = this.parent.get('tipo').valueChanges.subscribe( tipo => {
      if( tipo === 'CIS') {
        this.form.get('tipoCIS').enable();
      } else {
        this.form.get('tipoCIS').setValue(null);
        this.form.get('tipoCIS').disable()
      }
      
    });
  }

  ngOnDestroy(): void {
    this.subsctiption.unsubscribe();
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
