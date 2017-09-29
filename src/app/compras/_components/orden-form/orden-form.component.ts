import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { Compra, Sucursal } from 'app/models';
import { ProveedoresService } from 'app/compras/services/proveedores.service';
import { OrdendetAddDialogComponent } from '../ordendet-add-dialog/ordendet-add-dialog.component';


@Component({
  selector: 'sx-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenFormComponent implements OnInit, OnDestroy {
  

  form: FormGroup;

  @Input() sucursal: Sucursal;

  @Output() save = new EventEmitter<Compra>();

  @Input() fecha = new Date();

  disponibles$: Observable<any>;

  productosPorProveedor = [];

  subscription1: Subscription;

  constructor(
    private fb: FormBuilder,
    private service: ProveedoresService,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildForm();
    this.buildDisponibles();
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }

  buildForm() {
    this.form = this.fb.group({
      proveedor: [null, Validators.required],
      sucursal: [{value:this.sucursal, disabled: true}],
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      entrega: [new Date(), Validators.required],
      especial: [false],
      partidas: this.fb.array([]),
      comentario: ['', Validators.maxLength(100)]
    });
  }

  buildDisponibles(){
    this.disponibles$ = this.form.get('proveedor').valueChanges
    .switchMap(proveedor => {
      if(proveedor === null) return Observable.of([]);
      return this.service.getProductos(proveedor)
    }).catch(err => {
      console.log('Error accesando productos del proveedor...');
      return Observable.of(err);
    });

    this.subscription1 = this.disponibles$.subscribe(prods => {
      console.log('Disponibles: ', prods);
      this.productosPorProveedor = prods;
    })
    
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  get productosDisponibles(){
    return this.productosPorProveedor;
  }

  
  insertar() {
    let dialogRef = this.dialog.open(OrdendetAddDialogComponent, {
      data: {
        proveedor: this.proveedor,
        productos: this.productosDisponibles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Agregando partida....', result);
        // this.insertarCompraDet(element);
        this.cd.markForCheck();
      }
    });
  }

  agregarCompraDet(producto, cantidad) {

  }

  onEdit(index: number) {

  }

  onDelete(index: number) {

  }

  onSubmit() {
    if(this.form.valid) {
      const compra = this.prepareEntity();
      this.save.emit(compra);
    }
  }

  private prepareEntity() {
    const res = this.form.getRawValue();
    return {
      ...res
    };
  }

  get proveedor() {
    return this.form.get('proveedor').value;
  }
  
  disableAddPartidas() {
    return this.proveedor === null
  }

}
