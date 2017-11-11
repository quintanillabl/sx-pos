import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EfectivoDialogComponent } from './efectivo-dialog/efectivo-dialog.component';
import { CambioDeChequeDialogComponent } from './cambio-de-cheque-dialog/cambio-de-cheque-dialog.component';
import { DepositoDialogComponent } from './deposito-dialog/deposito-dialog.component';
import { TarjetaDialogComponent } from './tarjeta-dialog/tarjeta-dialog.component';
import { ChequeDialogComponent } from './cheque-dialog/cheque-dialog.component';
import { CorteCobranzaService } from 'app/caja/services/corteCobranza.service';
import { CorteCobranza } from 'app/caja/models/corteCobranza';

@Component({
  selector: 'sx-corte-cobranza',
  templateUrl: './corte-cobranza.component.html',
  styleUrls: ['./corte-cobranza.component.scss']
})
export class CorteCobranzaComponent implements OnInit {

  cortes: CorteCobranza[] = [];

  constructor(
    public dialog: MdDialog,
    private service: CorteCobranzaService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.list().subscribe(cortes => {
      this.cortes = cortes
    } , error => console.error(error));
  }

  efectivo() {
    const params = {
      pagosRegistrados: 17000.00,
      cortesAcumulados: 0.0,
      cambiosDeCheques: 0.0,
    }
    this.openDialog(EfectivoDialogComponent, params);
  }

  cheques() {
    const params = {
      pagosRegistrados: 300000.00,
      cortesAcumulados: 0.0,
      cambiosDeCheques: 0.0,
    }
    this.openDialog(ChequeDialogComponent, params);
  }

  tarjeta() {
    const params = {
      pagosRegistrados: 10000.00,
      cortesAcumulados: 0.0,
      cambiosDeCheques: 0.0,
    }
   this.openDialog(TarjetaDialogComponent, params)
  }

  depositos() {
    const params = {
      pagosRegistrados: 17000.00,
      cortesAcumulados: 0.0,
      cambiosDeCheques: 0.0,
    }
   this.openDialog(DepositoDialogComponent, params);
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

  save(corte) {
    console.log('Salvando corte de caja: ', corte);
    this.service.save(corte).subscribe( corte => {
      console.log('Corte exitosamente salvado: ', corte);
      this.load();
    }, error => console.error('Error salvando corte ', error));
  }


  cambioDeCheque() {
    const dialogRef = this.dialog.open(CambioDeChequeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doSaveCambioDeCheque(result);
      }
    });
  }

  doSaveCambioDeCheque(cambio) {
    console.log('Salvando cambio de cheque: ', cambio);
    this.service.cambioDeCheque(cambio).subscribe( cobro => {
      console.log('Cambio de cheque exitosamente salvado: ', cobro);
    }, error => console.error('Error salvando cambio de cheque ', error));
  }


}
