import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal } from 'app/models';
import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';

export function ImporteValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const efectivo = control.get('efectivo').value || 0;
    const cheque = control.get('cheque').value || 0;
    const transferencia = control.get('tarjeta').value || 0;
    const total = efectivo + cheque + transferencia;
    return total <= 0 ? {'totalInvalido': {value: control.value}} : null;
  };
}

@Component({
  selector: 'sx-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolicitudFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() solicitud: SolicitudDeDeposito;



  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.solicitud && changes.solicitud.currentValue) {
      // console.log('Editando solicitud: ', changes.solicitud.currentValue);
      const solicitud: SolicitudDeDeposito = _.clone(changes.solicitud.currentValue);

      const fecha = new Date(solicitud.fecha);
      const sol =  {
        ...this.solicitud,
        fecha: new Date(this.solicitud.fecha),
        fechaDeposito: new Date(this.solicitud.fechaDeposito),
        solicita: solicitud.createUser
      }
      this.form.patchValue(sol);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      fecha: [new Date(), Validators.required],
      cliente: [null, Validators.required],
      efectivo: 0,
      cheque: 0,
      tarjeta: 0,
      fechaDeposito: [null, Validators.required],
      referencia: [''],
      banco: [null, Validators.required],
      cuenta: [null, Validators.required],
      comentario: [{value: null, disabled: true}, [Validators.maxLength(100)]],
      solicita: [null, Validators.required]
    }, {validator: ImporteValidator()});
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity(): SolicitudDeDeposito {
    return {
      ...this.form.getRawValue(),
      fechaDeposito: this.form.get('fechaDeposito').value.toISOString(),
      createUser: this.form.get('solicita').value,
      updateUser: this.form.get('solicita').value
    }
  }

  get id() {
    return this.form.get('id').value;
  }

  get fecha() {
    return this.form.get('fecha').value;
  }

  get banco() {
    return this.form.get('banco').value;
  }

  get cuenta() {
    return this.form.get('cuenta').value;
  }

  isReadOnly() {
    if (this.id === null) {
      const comentario: string = this.form.get('comentario').value;
      if (comentario !== null && comentario.length === 0) {
        return true;
      }
    }
    return false;
  }

}

