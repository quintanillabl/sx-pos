import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Venta } from '@siipapx/models';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-vale-automatico-dialog',
  templateUrl: './vale-automatico-dialog.component.html',
  styles: ['.fill { width: 100%; }'],
})
export class ValeAutomaticoDialogComponent implements OnInit {


  form: FormGroup
  title = 'Generacion de Vale por Venta';
  pedido: any;
  partidas$: Observable<any>;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ValeAutomaticoDialogComponent>,
    private fb: FormBuilder,
    private service: PedidosService
  ) {
    if (data.title) {
      this.title = data.title;
    }
  }

  buildForm() {
    this.form = this.fb.group({
      sucursalVale: [null],
      comentario: [null],
      partidas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.pedido = this.data.pedido;
    this.partidas$ = this.service
    .getPartidasVale(this.data.pedido.id)
    .catch(err => Observable.of([]));
    this.partidas$.forEach(partida => console.log(partida));
    this.buildForm()
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      ... this.form.getRawValue(),
    };
    console.log(res);
    this.dialogRef.close(res);
  }

  setUsuario(usuario: any) {
    this.form.get('usuario').setValue(usuario);
  }

  modificar( row, value) {
    row.cantidad = value;
  }

}

