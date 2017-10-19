import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Producto } from "@siipapx/models";

@Component({
  selector: 'app-prod-selector',
  templateUrl: './prod-selector.component.html',
  styleUrls: ['./prod-selector.component.scss']
})
export class ProdSelectorComponent implements OnInit, OnDestroy {

  producto: Producto = undefined;
  activos = new FormControl(true);
  deLinea = new FormControl(true);
  
  private storeKey = 'sx.product-selector.state';

  constructor() { }

  ngOnInit() {
    /*
    const state = JSON.parse(localStorage.getItem(this.storeKey));
    this.activos.setValue(state.activos);
    this.deLinea.setValue(state.deLinea);
    */
  }

  ngOnDestroy() {
    
    localStorage.setItem(this.storeKey, JSON.stringify(this.stateObject()))
  }

  onSelection(producto) {
    this.producto = producto;
  }

  private stateObject(){
    return {
      activos: this.activos.value,
      deLinea: this.deLinea.value
    };
  }

  

}
