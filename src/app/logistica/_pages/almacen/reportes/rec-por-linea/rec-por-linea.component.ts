import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { KardexService } from '@siipapx/logistica/services/kardex.service';

@Component({
  selector: 'sx-rec-por-linea',
  templateUrl: './rec-por-linea.component.html',
  styles: [`
    .rec-form {
      width: 300px;
    }
  `]
})
export class RecPorLineaComponent implements OnInit {

  form: FormGroup;

  estados = ['TODOS', 'ACTIVOS', 'INACTIVOS'];
  tipos = ['TODOS', 'DELINEA', 'ESPECIALES'];
  existencia = ['TODOS', 'POSITIVOS', 'NEGATIVOS', 'EN_CERO'];
  clases: Array<any>;
  lineas: Array<any>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<RecPorLineaComponent>,
    private service: KardexService
  ) { }

  ngOnInit() {
    this.service.getLineas().subscribe( data => this.lineas = data);
    this.service.getClases().subscribe( data => this.clases = data);
    this.form = this.fb.group({
      tipo: ['TODOS', Validators.required],
      estado: ['ACTIVOS', Validators.required],
      existencia: ['TODOS', Validators.required],
      linea: [null, Validators.required],
      clase: [null]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const res = {
      ... this.form.value,
    };
    this.dialogRef.close(res);
  }
}
