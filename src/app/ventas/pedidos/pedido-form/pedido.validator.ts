
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
  const formaDePago = control.get('formaDePago').value;
  const total = (control.get('total').value);

  // Reglas de validacion de cliente
  if (cliente) {
    
    if (!cliente.activo) {
      return { clienteSuspendido: true};
    }

    if(cliente.juridico){
      return { clienteEnJuridico: true}
    }
    if(cliente.chequeDevuelto > 0){
      return { clienteConChequesDevueltos: true}
    }
  
    if (cliente.credito && tipo === 'CRE') {
      
      if(!cliente.credito.creditoActivo){
        return { creditoSuspendido: true};
      } 

      if (cliente.credito.atrasoMaximo > 7 ){
        return { atrasoMaximo: true};
      }

      const nvoTotal = total + cliente.credito.saldo;
      if ( cliente.credito.lineaDeCredito < nvoTotal ) {
        return { lineaSaturada: true};
      }
    }
  }
  

  // Valida que existan partidas
  const partidas = (control.get('partidas') as FormArray).value;
  if (partidas.length === 0) {
    return { sinPartidas: true };
  }
  // Valida que el importe del pedido sea mayor o igual a $10

  if (total < 1) {
    return { importeMuyBajo: true };
  }

  // Validar que si se selecciona COD se configure el envio
  const cod = (control.get('cod').value);
  const entrega = (control.get('entrega').value);
  if (cod) {
    if (entrega === 'LOCAL') {
      return { codSinEnvio: true}
    }
    if (formaDePago === 'TARJETA_CREDITO' || formaDePago === 'TARJETA_DEBITO' ) {
      return { codConFormaDePagoIncorrecta: true}
    }
  }
  if (entrega !== 'LOCAL') {
    const envio = control.get('envio').value;
    if (envio === null ) {
      return { entregaSinEnvio: true}
    }
  }

  // Validar forma de pago cheque

  if (formaDePago === 'CHEQUE' && tipo !== 'CRE') {
    if (cliente && !cliente.permiteCheque) {
      return { noSePermiteFormaDeCheque: true}
    }
  }

  // Validar que el total no pase de 100,000
  if (formaDePago === 'EFECTIVO') {
    if (total > 100000) {
      return { totalMaximoPermitido: true}
    }
  }

  // Validar el uso de vale
  const conVale = partidas.find (item => item.conVale);
  if (conVale) {
    const clasificacionVale = control.get('clasificacionVale').value;
    const sucursalVale = control.get('sucursalVale').value;
    if ( clasificacionVale === 'SIN_VALE' || sucursalVale === null) {
      return { sinConfiguracionDeVale: true}
    }
  }

  /* Validar el socio de la union
  if (cliente !== null && cliente.clave === 'U050008') {
   const socio = control.get('socio').value;
   if (socio === null) {
     return { seRequiereSocio: true};
   }
  }
  */

  // Validacion de usuario
  const user = control.get('usuario').value;
  if (!user) {
    return  { sinUsuario: true}
  }

  return null;
};
