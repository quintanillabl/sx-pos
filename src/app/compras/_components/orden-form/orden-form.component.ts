import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

import { Compra, CompraDet, Sucursal } from 'app/models';
import { ProveedoresService } from 'app/compras/services/proveedores.service';
import { OrdendetAddDialogComponent } from '../ordendet-add-dialog/ordendet-add-dialog.component';

//ngrx
import { Store } from '@ngrx/store';
import * as fromCompras from 'app/compras/store/reducers';
import { SelectProveedorAction } from 'app/compras/store/actions/ocompra-form.actions';

export const PartidasValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const partidas = (control.get('partidas') as FormArray).value;
  return partidas.length ? null : { noPartidas: true };
};

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

  subscription1: Subscription;

  selected: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private service: ProveedoresService,
    public dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private store: Store<fromCompras.ComprasState>
  ) { }

  ngOnInit() {
    this.buildForm();
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
    },{
      validator: PartidasValidator
    });

    this.subscription1 = this.form.get('partidas')
      .valueChanges
      .map( value => _.map(value, 'producto.clave'))
      .subscribe( (value: any) => {
        this.selected = value;
        // console.log('Selected: ', this.selected);
      });
    
    // this.selected$.subscribe( selected => console.log('Selected: ', selected));
  }
  

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }
  
  insertar() {
    let dialogRef = this.dialog.open(OrdendetAddDialogComponent, {
      data: {
        proveedor: this.proveedor,
        selected: this.selected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const compraDet = {
          ...result,
          producto: result.producto.producto
        };
        this.agregarCompraDet(compraDet);
        
      }
    });
  }

  agregarCompraDet(det: CompraDet) {
    det.sucursal = this.sucursal;
    det.sw2 = 'SIIPAPX';
    this.partidas.push(new FormControl(det));
    this.cd.markForCheck();
  }

  onEdit(index: number) {
    
  }

  onDelete(index: number) {
    this.partidas.removeAt(index);
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
