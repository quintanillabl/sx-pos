import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-add-cliente-contacto',
  template: `
    <div [formGroup]="parent" layout="column" layout-align="center strech">
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Nombre">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Telefono">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Celular">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Fax">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="email" mdInput placeholder="Email CFDI">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="email" mdInput placeholder="Email Empresa">
      </md-form-field>
      <md-form-field flex class="full-width">
        <input type="text" mdInput placeholder="Página web">
      </md-form-field>
    </div>
  `,
  styles: ['.full-width { width: 100%; }']
})

export class AddClienteContactoComponent implements OnInit {

  @Input() parent: FormGroup;
  
  constructor() { }

  ngOnInit() { }
}