import { Injectable } from '@angular/core';
import {MdDialog, MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import { AddClienteDialogComponent } from "@siipapx/clientes/_components/add-cliente-dialog/add-cliente-dialog.component";

@Injectable()
export class AddNewClienteService {

  constructor(public dialog: MdDialog) { }

  newCliente() {
    console.log('Registrando un nuevo cliente');
    const dialogRef = this.dialog.open(AddClienteDialogComponent, {
      
      data: {
        animal: 'panda'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result:`, result); 
    });
  }

}
