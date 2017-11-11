import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { GastoComponent } from './gasto/gasto.component';
import { RembolsoComponent } from './rembolso/rembolso.component';
import { FondoFijoService } from 'app/caja/services/fondo-fijo.service';
import { FondoFijo } from 'app/caja/models/fondoFijo';

@Component({
  selector: 'sx-corte-fondo-fijo',
  templateUrl: './corte-fondo-fijo.component.html',
  styleUrls: ['./corte-fondo-fijo.component.scss']
})
export class CorteFondoFijoComponent implements OnInit {

  movimientos: FondoFijo[] = [];
  
  constructor(
    public dialog: MdDialog,
    private service: FondoFijoService
  ) { }
  
  ngOnInit() {
    this.load();
  }
  
  load() {
    this.service.list().subscribe(movimientos => {
      this.movimientos = movimientos
    } , error => console.error(error));
  }

  gasto() {
    const params = {}
    this.openDialog(GastoComponent, params);
  }

  rembolso() {
    const params = {}
    this.openDialog(RembolsoComponent, params);
  }

  openDialog(component, params: {} = {}) {
    const dialogRef = this.dialog.open(component, {
      data: params
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(fondo) {
    console.log('Salvando fondo de caja: ', fondo);
    this.service.save(fondo).subscribe( fondo => {
      console.log('Registro de movimiento en fondo fijo exitosamente salvado: ', fondo);
      this.load();
    }, error => console.error('Error salvando fondo ', error));
  }

}
