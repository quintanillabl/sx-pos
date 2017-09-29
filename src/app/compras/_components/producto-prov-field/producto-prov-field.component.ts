import {Component, Input, OnInit, OnDestroy, 
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { Proveedor } from 'app/models';
import { environment} from 'environments/environment';

export const PRODUCTO_PROV_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => ProductoProvFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-producto-prov-field',
  providers: [PRODUCTO_PROV_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './producto-prov-field.component.html',
  styleUrls: ['./producto-prov-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductoProvFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {

  readonly apiUrl = environment.apiUrl + '/proveedores';

  searchControl = new FormControl();

  @Input() proveedor: Proveedor;

  @Input() required = false;

  @Input() activos: boolean = true;

  @Input() placeholder = "Seleccione un producto";

  productos$: Observable<Array<any>>;

  onChange;
  onTouch;
  subscription: Subscription;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.productos$ = this.searchControl
      .valueChanges
      .startWith(null)
      .switchMap( term => this.lookupProductos(term));

    this.prepareControl();
  }
  
  private prepareControl() {
    this.subscription = this.searchControl
      .valueChanges
      .skip(1)
      .filter( value => value !== null)
      .subscribe( value => {
        if( _.isObject(value)) {
          this.onChange(value);
        } else {
          this.onChange(null);
        }
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  lookupProductos(term: string): Observable<Array<any>> {
    let params = new HttpParams()
      .set('term', term);
    if (this.activos === true) {
      params = params.set('activos','activos')
    }  
    const url = `${this.apiUrl}/${this.proveedor.id}/productos`
    return this.http.get<Array<any>>(url, {params: params});
  }

  displayFn(provProd) {
    return provProd ? `(${provProd.producto.clave}) ${provProd.producto.descripcion}` : '';
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
    if(obj === null) {
      this.searchControl.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  focus() {
    this.inputField.nativeElement.focus();
  }

  onBlur() {
    if(this.onTouch) {
      this.onTouch();
    }
  }

}
