import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const AutorizacionValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const origen = control.get('origen').value;
  const destino = control.get('destino').value;
  if( origen && destino ){
    console.log('Validando precios: ')
    console.log(`Origen: ${origen.producto.precioContado} Destino: ${destino.producto.precioContado}`);
    return origen.producto.precioContado < destino.producto.precioContado ? null : { precioMenor: true};
  }
  return null;
};
 
@Component({
  selector: 'sx-transformaciondet-dialog',
  templateUrl: './transformaciondet-dialog.component.html',
  styleUrls: ['./transformaciondet-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformaciondetDialogComponent implements OnInit, OnChanges, OnDestroy {
  
  form: FormGroup

  @Input() tipo = 'TRANSFORMACION';

  sucursal

  subscription1: Subscription;
  
  constructor(
    public dialogRef: MdDialogRef<TransformaciondetDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { 
    this.sucursal = data.sucursal;
    this.tipo = data.tipo;
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes) {}

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  buildForm() {
    this.form = this.fb.group({
      origen: [null, Validators.required],
      disponible: [{value: 0, disabled: true}, [Validators.required, Validators.min(1)]],
      salida: [null, [Validators.required, Validators.min(1)]],
      destino: [null, Validators.required],
      entrada: [null, [Validators.required, Validators.min(1)]],
      cortes: [0],
      instruccion: ['', Validators.maxLength(100)],
      autorizacion: this.fb.group({
        clave: [{value:'', disabled: true}],
        usuario: [{value:'', disabled: true}],
      })
    });

    this.subscription1 = this.form.get('origen').valueChanges
      .subscribe( existencia => {
        if( existencia )
          this.form.get('disponible').setValue(existencia.cantidad);
      });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if( this.form.valid) {
      const trs = this.prepareEntity()
      this.dialogRef.close(trs);
    }
  }

  private prepareEntity() {
    const data = this.form.getRawValue();
    // console.log('Partida: ', data);
    const trs = {
      salida: {producto: data.origen.producto,  cantidad: data.salida},
      entrada: {producto: data.destino.producto,  cantidad: data.entrada},
      cortes: data.cortes,
      instruccion: data.instruccion
    };
    return trs;
  }

  get disponible() {
    return this.form.get('disponible').value;
  }
  get existenciaDestino() {
    return this.form.get('destino').value ? this.form.get('destino').value.cantidad: 0 
  }

}
