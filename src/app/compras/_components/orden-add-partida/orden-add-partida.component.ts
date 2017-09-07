import { Component, OnInit, Input, Output, EventEmitter, 
  ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Proveedor } from "../../../models/proveedor";
import { Sucursal } from "../../../models/sucursal";

@Component({
  selector: 'sx-orden-add-partida',
  templateUrl: './orden-add-partida.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenAddPartidaComponent implements OnInit, OnChanges {
  
  parent: FormGroup;
  
  @Input() proveedor: Proveedor;
  @Input() productos
  @Input() sucursal: Sucursal;
  
  @Output() agregar = new EventEmitter();

  form: FormGroup;

  @ViewChild('productoField') productoFieldRef;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sucursal: [null],
      producto: ['', Validators.required],
      cantidad: [null, Validators.required],
      precio: [null, Validators.required],
      comentario: [null, Validators.maxLength(100)]
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    // if(changes.sucursal.firstChange){
    //   console.log('Fist change:....');
    // }
    this.reset();
    
  }

  get disableSucursal() {
    if ( !this.sucursal) {
      return false;
    } else {
      return this.sucursal.nombre !== 'OFICINAS';
    }
    
  }

  agregarPartida(){
    const partida = this.preparePartida();
    this.agregar.emit(partida);
    this.reset();
    if(this.productoFieldRef){
      this.productoFieldRef.focus();
    }
  }

  private preparePartida() {
    const partida = {
      ...this.form.value
    }
    
    partida.producto = {
      id: partida.producto.id,
      clave: partida.producto.clave,
      descripcion: partida.producto.descripcion
    };

    if (!this.isDistribuida()) {
      partida.sucursal = {
        id: this.sucursal.id,
        nombre: this.sucursal.nombre
      }
    }
    return partida;
  }

  private reset(){
    this.form.reset();
    // this.form.reset({
    //   sucursal: {value:this.sucursal, disabled: this.disableSucursal},
    //   producto: null,
    //   precio: null,
    //   comentario: null
    // });
    
  }

  isDistribuida() {
    return this.sucursal ? this.sucursal.nombre === 'OFICINAS' : false;
  }

}
