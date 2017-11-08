import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { EnvioDireccionComponent } from '@siipapx/ventas/pedidos/pedido-form/envio-direccion/envio-direccion.component';

@Component({
  selector: 'sx-pedido-envio-panel',
  templateUrl: './pedido-envio-panel.component.html',
  styleUrls: ['./pedido-envio-panel.component.css']
})
export class PedidoEnvioPanelComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;

  subscription: Subscription;
  subscription2: Subscription;

  constructor(
    public dialog: MdDialog,
  ) { }

  get envio() {
    return this.parent.get('envio').value
  }

  

  ngOnInit() {
    this.subscription = this.parent.get('entrega').valueChanges.subscribe( entrega => {
      console.log('Evaluando entrega: ', entrega);
      if (entrega !== 'LOCAL'){
        this.parent.get('clasificacionVale').enable();
        this.parent.get('sucursalVale').enable();
        this.parent.get('almacen').enable();
        this.parent.get('mismaDireccion').enable();
        // this.parent.get('entregaParcial').enable();
        // const direccion = this.parent.get('direccion').value;

        const cliente = this.parent.get('cliente').value;
        if (cliente !== null) {
          this.parent.get('envio').setValue({direccion: cliente.direccion});
        } 
      } else {
        this.parent.get('clasificacionVale').disable();
        this.parent.get('sucursalVale').disable();
        this.parent.get('almacen').disable();
        this.parent.get('mismaDireccion').disable();
        // this.parent.get('entregaParcial').disable();
        this.parent.get('envio').setValue(null);
      }
    });

    this.subscription2 = this.parent.get('mismaDireccion').valueChanges.subscribe( value => {
      if (value === false ) {
        this.registrarDireccion();
      }
    });
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  registrarDireccion() {
    if (this.envio) {
      const dialogRef = this.dialog.open(EnvioDireccionComponent, );
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Asignando direccion de envío: ', result);
          this.parent.get('envio').setValue({direccion: result});
        }
      });
    }
  }
  
  get disabled() {
    return this.parent.get('cliente').value === null
  }

}
