import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { TdMessageComponent, TdLoadingService } from '@covalent/core';


import { Compra } from "../../../models/compra";
import { OrdenesService } from "../../services/ordenes.service";

@Component({
  selector: 'sx-ordenes-create-page',
  templateUrl: './ordenes-create-page.component.html',
  styleUrls: ['./ordenes-create-page.component.scss']
})
export class OrdenesCreatePageComponent implements OnInit {

  // This mode shlould be configurable by the user with help of the ngrx store
  mode = 'vertical'; 
  form: FormGroup;

  @ViewChild(TdMessageComponent) message: TdMessageComponent;
  
  masterState: string = 'none';

  stepOneState$: Observable<string>;
  
  // Step two
  stepTowDisabled$: Observable<boolean>;
  stepTowState$: Observable<string>;

  // Step three
  stepThreeDisabled$: Observable<boolean>;
  stepThreeState$: Observable<string>;
  
  minDate = new Date();

  error: string = undefined;

  loading: false;

  constructor(
    private fb: FormBuilder,
    private ordenesService: OrdenesService,
    private loadingService: TdLoadingService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.stepOneState$ = this.form.get('stepOne')
      .statusChanges
      .map( status => status === 'VALID' ? 'complete' : 'required')
      .share();

    this.stepTowDisabled$ = this.stepOneState$
      .map( state => state !== 'complete' )
      .startWith(true);

    
  }

  buildForm(){
    this.form = this.fb.group({
      stepOne: this.fb.group({
        proveedor: [null, Validators.required],
        sucursal: [null, Validators.required],
        fecha: [{value: new Date(), disabled: true}, Validators.required],
        entrega: [new Date(), Validators.required],
        especial: [false]
      }),
      partidas: this.fb.array([]),
      stepThree: this.fb.group({
        comentario: [null, Validators.maxLength(100)]
      }),
      
    });
    this.form.statusChanges
  }

  change($event) {
    // console.log('Step chaned: ', $event);
    // console.log('Value: ', this.form.value);
  };

  get partidas() {
    return this.form.get('partidas') as FormArray
  }

  get proveedor() {
    return this.form.get('stepOne').get('proveedor').value;
  }

  get sucursal(){
    return this.form.get('stepOne').get('sucursal').value;
  }

  addPartida(partida: any){
    this.partidas.push(new FormControl(partida));
  }

  onSubmit() {
    if( this.form.valid) {
      const compra = this.prepareCompra();
      this.loadingService.register('savingCompra');
      this.ordenesService
      .save(compra)
      .delay(1000)
      .subscribe( 
        val => { 
          console.log('POST Success', val);
          this.loadingService.resolve('savingCompra');
        },
        response => {
          this.handlePostError(response);
          this.loadingService.resolve('savingCompra');
        }
      );
    }
  }

  private handlePostError(response){
    
    this.error = 'Error al salvar compra. Status: ' + response.status;
    if(response.status === 422 && response.error && response.error._embedded) {
      console.log('Response ', response.error._embedded.errors);
      this.error = response.error._embedded.errors.map(item=> item.message).join(',');
    } else if(response.status === 422 && response.error ) {
      this.error = response.error.message;
    }
  } 

  private prepareCompra() {
    const raw = this.form.getRawValue();
    return {
      ...raw.stepOne,
      ...raw.partidas,
      ...raw.stepThree
    }
  }

  clearError(){
    this.error = undefined; 
    this.message.close();
  }

}
