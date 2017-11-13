import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import {Cobro} from 'app/models/cobro';

@Component({
  selector: 'sx-cheque-form',
  templateUrl: './cheque-form.component.html',
  styleUrls: ['./cheque-form.component.scss']
})
export class ChequeFormComponent implements OnInit {

  form: FormGroup;
  cobro: Cobro

  constructor(
    private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ChequeFormComponent>,
  ) {
    this.cobro = data.cobro;
  }

  ngOnInit() {
    this.form = this.fb.group({
      numero: '',
    });
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.cobro);
    }
  }

}

