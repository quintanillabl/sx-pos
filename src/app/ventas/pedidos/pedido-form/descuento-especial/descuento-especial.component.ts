import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sx-descuento-especial',
  templateUrl: './descuento-especial.component.html',
  styleUrls: ['./descuento-especial.component.scss']
})
export class DescuentoEspecialComponent implements OnInit {

  descuento = 0.0;
  control: FormControl;

  constructor(
    public dialogRef: MdDialogRef<DescuentoEspecialComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.descuento = data.descuento;
  }

  ngOnInit() {
    this.control = new FormControl(this.descuento, [Validators.min(1), Validators.max(80)]);
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.control.valid) {
      this.dialogRef.close(this.control.value);
    }
  }

}
