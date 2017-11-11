import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'sx-tarjeta-dialog',
  templateUrl: './tarjeta-dialog.component.html',
  styleUrls: ['./tarjeta-dialog.component.scss']
})
export class TarjetaDialogComponent implements OnInit {

  form: FormGroup;
  
    subscription: Subscription
  
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<TarjetaDialogComponent>,
      private fb: FormBuilder
    ) { 
      this.buildForm();
      this.form.patchValue({
        pagosRegistrados: data.pagosRegistrados,
        cortesAcumulados: data.cortesAcumulados,
        cambiosDeCheques: data.cambiosDeCheques,
      });
    }
  
    private buildForm() {
      this.form = this.fb.group({
        fecha: [{value: new Date(), disabled: false}, Validators.required],
        corte: [{value: new Date(), disabled: true}, Validators.required],
        pagosRegistrados: [{value: 0, disabled: true}, Validators.required],
        cortesAcumulados: [{value: 0, disabled: true}, Validators.required],
        cambiosDeCheques: [{valude: 0, disabled:true}, Validators.required],
        importe: [{value: 0, disable: true}, [Validators.required, this.validarImporte.bind(this)]],
        tipoDeVenta: ['CON', Validators.required],
        cierre: false,
        anticipoCorte: false,
        comentario: ['']
      });
    }
  
    ngOnInit() {
      this.form.get('importe').setValue(this.disponible);
      this.subscription = this.form.get('cierre').valueChanges.subscribe( checked => {
        if(checked) {
          this.form.get('importe').setValue(this.disponible);
          this.form.get('importe').disable();
        } else {
          this.form.get('importe').enable();
        }
      });
    }
  
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
  
    cancelar() {
      this.dialogRef.close(null);
    }
  
    onSubmit() {
      if (this.form.valid) {
        const fecha: Date = this.form.get('fecha').value;
        const corteF: Date = this.form.get('corte').value;
        const corte = {
          ... this.form.getRawValue(),
          fechaDeposito: this.calcularFechaDeposito(),
          deposito: this.form.get('importe').value,
          formaDePago: 'TARJETA',
          corte: fecha.toISOString(),
          fecha: corteF.toISOString(),
        }
        this.dialogRef.close(corte);
      }
    }
  
    get corte() {
      return this.form.get('corte').value;
    }
  
    get pagosRegistrados() {
      return this.form.get('pagosRegistrados').value;
    }
  
    get cortesAcumulados() {
      return this.form.get('cortesAcumulados').value;
    }
  
    get cambiosDeCheques() {
      return this.form.get('cambiosDeCheques').value;
    }
  
    get disponible() {
      return this.pagosRegistrados - this.cortesAcumulados - this.cambiosDeCheques;
    }
  
    calcularFechaDeposito() {
      const today = new Date();
      if(this.form.get('anticipoCorte').value) {
        return new Date().setDate(today.getDate() - 1);
      }
      return today;
    }
  
    validarImporte(control: AbstractControl) {
      const importe = control.value;
      if( importe <= 0 ){
        return {importeInvalido: true};
      }
      return null;
    }

}
