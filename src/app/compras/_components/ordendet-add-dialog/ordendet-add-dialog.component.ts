import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Proveedor } from '@siipapx/models';

@Component({
  selector: 'app-ordendet-add-dialog',
  templateUrl: './ordendet-add-dialog.component.html',
  styleUrls: ['./ordendet-add-dialog.component.scss']
})
export class OrdendetAddDialogComponent implements OnInit {

  form: FormGroup;
  
  proveedor: Proveedor;

  selected: Array<string>;

  constructor(
    public dialogRef: MdDialogRef<OrdendetAddDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { 
    this.proveedor = data.proveedor;
    this.selected = data.selected;
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      solicitado: [0, [Validators.min(1),Validators.required]],
      comentario: ['', Validators.maxLength(100)]
    })
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if(this.form.valid) {
      const res = this.form.value
      this.dialogRef.close(res);
    }
  }

  displayFn(provProd) {
    return provProd ? provProd.producto.clave : '';
  }

}
