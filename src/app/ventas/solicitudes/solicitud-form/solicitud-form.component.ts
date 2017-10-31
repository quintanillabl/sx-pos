
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';


import { Sucursal } from 'app/models';
import { SolicitudDeDeposito } from '@siipapx/ventas/models/solicitudDeDeposito';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<any>();

  @Input() solicitud: SolicitudDeDeposito;

  @Input() readonly = false;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.embarque && !changes.embarque.isFirstChange()) {
      const solicitud: SolicitudDeDeposito = changes.solicitud.currentValue;
      this.form.patchValue(solicitud);
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
      comentario: [{value: '', disabled: true}, [Validators.maxLength(100)]],
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
    }
  }

  get id() {
    return this.form.get('id').value;
  }

  get fecha() {
    return this.form.get('fecha').value;
  }



}

