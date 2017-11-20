import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-validation-panel',
  templateUrl: './validation-panel.component.html',
  styleUrls: ['./validation-panel.component.scss']
})
export class ValidationPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get invalid() {
    return this.parent.hasError('importeMuyBajo');
  }

  get invalidMessage() {
    if (this.parent.hasError('importeMuyBajo')) {
      return 'Importe mínimo para venta es de $10.00';
    }
    if (this.parent.hasError('codSinEnvio')) {
      return 'Requiere configurar el envío si es pedido COD';
    }
    if (this.parent.hasError('entregaSinEnvio')) {
      return 'Se requiere configurar la direccion de envío ';
    }
    if (this.parent.hasError('noSePermiteFormaDeCheque')) {
      return 'No se permite forma de pago CHEQUE para este cliente';
    }
    return null;
  }

}
