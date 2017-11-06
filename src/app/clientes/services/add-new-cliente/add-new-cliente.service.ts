import { Injectable } from '@angular/core';
import {MdDialog, MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import { AddClienteDialogComponent } from 'app/clientes/_components/add-cliente-dialog/add-cliente-dialog.component';
import { ClienteService } from 'app/clientes/services/cliente.service';

@Injectable()
export class AddNewClienteService {

  constructor(
    public dialog: MdDialog,
    private service: ClienteService
    ) { }

  newCliente() {
    console.log('Registrando un nuevo cliente');
    const dialogRef = this.dialog.open(AddClienteDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(`Salvando cliente:`, result);
      this.service.save(result).subscribe( cliente => console.log('Cliente registrado: ', cliente));
    });
  }

}
