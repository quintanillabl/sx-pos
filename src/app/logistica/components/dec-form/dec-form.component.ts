import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Sucursal, Producto } from "app/models";
 import { SelectorDeComDialogComponent } from "./selector-de-com/selector-de-com-dialog.component";
import { DevolucionDeCompra } from "app/logistica/models/devolucionDeCompra";
import { DevolucionDeCompraDet } from "app/logistica/models/devolucionDeCompraDet";
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { RecepcionDeCompraDet } from 'app/logistica/models/recepcionDeCompraDet';

export const PartidasValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const partidas = (control.get('partidas') as FormArray).value;
  return partidas.length ? null : { noPartidas: true };
};

@Component({
  selector: 'sx-dec-form',
  templateUrl: './dec-form.component.html',
  styleUrls: ['./dec-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecFormComponent implements OnInit {

  form: FormGroup;
  
  @Input() fecha = new Date();

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<DevolucionDeCompra>();

  inserted$: Observable<RecepcionDeCompraDet[]>;

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
      recepcionDeCompra: [null, Validators.required],
      comentario: ['', [Validators.maxLength(100)]],
      partidas: this.fb.array([])
    },{
      validator: PartidasValidator
    });

    this.inserted$ = this.form.get('partidas')
      .valueChanges
      .map( (value: Array<DevolucionDeCompraDet> )  => _.map(value, item => item.recepcionDeCompraDet) )
   
  }
  
  onSubmit(){
    if(this.form.valid) {
      const entity = this.prepareEntity();
      this.save.emit(entity);
    }
  }

  private prepareEntity() {
    return {
      ...this.form.getRawValue(),
      proveedor: this.recepcionDeCompra.proveedor,
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  removePartida(index: number) {
    this.partidas.removeAt(index);
  }

  asignarCom(com: RecepcionDeCompra){
    if(!this.recepcionDeCompra){
      this.form.patchValue({recepcionDeCompra: com});
    }
  }

  insertar() {
    
    let dialogRef = this.dialog.open(SelectorDeComDialogComponent, {
      data: {sucursal:this.sucursal, com: this.recepcionDeCompra}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Asignando com....', result);
        if(!this.recepcionDeCompra)
          this.asignarCom(result.com);
        result.partidas.forEach(element => {
          this.insertarComDet(element);
        });
        this.cd.markForCheck();
      }
    });
    
  }

  insertarComDet(comDet: RecepcionDeCompraDet) {
    const fg = this.fb.group({
      recepcionDeCompraDet:comDet,
      cantidad: [comDet.cantidad , Validators.required],
      producto: {
        id: comDet.producto.id,
        clave: comDet.producto.clave,
        descripcion: comDet.producto.descripcion
      } 
    });
    this.partidas.push(fg);
  }

  get recepcionDeCompra() {
    return this.form.get('recepcionDeCompra').value;
  }
  
  editarPartida($event) {
    console.log('Editando: ', $event);
    const {row, cantidad} = $event;
    this.partidas.controls[row].patchValue({cantidad: cantidad});
  }

  onDelete(index: number){
    this.removePartida(index);
  }
  
}
