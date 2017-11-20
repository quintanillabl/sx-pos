
import {AbstractControl, FormArray, ValidatorFn} from '@angular/forms';

/**
 * Valida algunos datos generales del pedido
 *
 * @param {AbstractControl} control
 * @returns {{[p: string]: boolean}}
 * @constructor
 */
export const PedidoValidator = (control: AbstractControl): {[key: string]: boolean} => {

  // Algunos valores requeridos en las validaciones
  const cliente = control.get('cliente').value;
  const tipo = control.get('tipo').value;

  // Valida que existan partidas
  const partidas = (control.get('partidas') as FormArray).value;
  if (partidas.length === 0) {
    return { sinPartidas: true };
  }
  // Valida que el importe del pedido sea mayor o igual a $10
  const total = (control.get('total').value);
  if (total < 10) {
    return { importeMuyBajo: true };
  }

  // Validar que si se selecciona COD se configure el envio
  const cod = (control.get('cod').value);
  const entrega = (control.get('entrega').value);
  if (cod) {
    if (entrega === 'LOCAL') {
      return { codSinEnvio: true}
    }
  }
  if (entrega !== 'LOCAL') {
    const envio = control.get('envio').value;
    if (envio === null ) {
      return { entregaSinEnvio: true}
    }
  }

  // Validar forma de pago cheque
  const formaDePago = control.get('formaDePago').value;

  if (formaDePago === 'CHEQUE' && tipo !== 'CRE') {
    if (cliente && !cliente.permiteCheque) {
      return { noSePermiteFormaDeCheque: true}
    }
  }

  return null;
};
