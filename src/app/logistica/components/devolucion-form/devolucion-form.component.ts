import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { Sucursal } from "app/models";
import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";
import { SelectorDeVentasDialogComponent } from "./selector-de-ventas/selector-de-ventas-dialog.component";

@Component({
  selector: 'sx-devolucion-form',
  templateUrl: 'devolucion-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevolucionFormComponent implements OnInit {

  form: FormGroup;
  
  @Input() fecha = new Date();

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<DevolucionDeVenta>();

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  

  buildForm(){
    this.form = this.fb.group({
      sucursal: [{value: this.sucursal, disabled: true}, Validators.required],
      fecha: [{value: this.fecha, disabled: true}, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      venta: [null, Validators.required],
      partidas: this.fb.array([])
    });
    this.form.get('venta').valueChanges.subscribe(value=> console.log('Venta: ', value));
  }
  
  onSubmit(){
    if(this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    return {
      ...this.form.getRawValue()
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  insertar() {
    let dialogRef = this.dialog.open(SelectorDeVentasDialogComponent, {
      data: {sucursal:this.sucursal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Asignando venta....', result);
        this.form.patchValue({venta: result.venta}); // Asignando la venta
        result.partidas.forEach(element => {
          this.insertarVentaDet(element);
        });
        this.cd.markForCheck();
      }
    });
  }

  insertarVentaDet(ventaDet) {
    const fg = this.fb.group({
      ventaDet: {
        id: ventaDet.id,
        cantidad: ventaDet.cantidad
      },
      cantidad: [ventaDet.cantidad, Validators.required],
      producto: {
        id: ventaDet.producto.id,
        clave: ventaDet.producto.clave,
        descripcion: ventaDet.producto.descripcion
      } 
    });
    this.partidas.push(fg);
  }

  get venta() {
    return this.form.get('venta').value;
  }
  
}
