import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Producto } from "@siipapx/models";
import { MdDialog } from '@angular/material';

import { ProdSelectorComponent } from "../_components/prod-selector/prod-selector.component";

@Injectable()
export class ProductUtils {

  constructor(
    public dialog: MdDialog
  ) { }

  /**
   *  Presenta un dialog para seleccionar un producto
   */
  openSelector() {
    const dialogRef = this.dialog.open(ProdSelectorComponent, {
    });
    dialogRef.afterClosed().subscribe( result => {
      if( result ) {
        console.log('Producto seleccionado: ', result); 
      }
    });
  }
}