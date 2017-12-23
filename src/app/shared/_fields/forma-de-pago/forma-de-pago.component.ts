import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-forma-de-pago',
  templateUrl: './forma-de-pago.component.html',
  styleUrls: ['./forma-de-pago.component.scss']
})
export class FormaDePagoComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() propertyName = 'formaDePago';

  tipos = ['EFECTIVO', 'CHEQUE', 'TRANSFERENCIA', 'TARJETA_DEBITO', 'TARJETA_CREDITO',
    'DEPOSITO_CHEQUE', 'DEPOSITO_EFECTIVO', 'DEPOSITO_MIXTO'];

  constructor() { }

  ngOnInit() {
  }

}

