import { Component, OnInit, Inject } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-pedidodet-form-partida',
  templateUrl: 'pedido-det-form.component.html',
  styleUrls: ['./pedido-det-form.component.scss']
})
export class PedidoDetFormComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    public dialogRef: MdDialogRef<PedidoDetFormComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit() { 
    this.form = this.fb.group({
      existencia: [null, Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    this.dialogRef.close(this.form.getRawValue());
  }
}