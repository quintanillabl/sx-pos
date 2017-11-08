import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'sx-pedido-header',
  templateUrl: './pedido-header.component.html',
  styleUrls: ['./pedido-header.component.scss']
})
export class PedidoHeaderComponent implements OnInit, OnDestroy {


  @Output() addCliente = new EventEmitter();

  @Output() insertar = new EventEmitter();

  @Output() descuento = new EventEmitter();

  @Input() parent: FormGroup;

  subscription: Subscription

  constructor() { }

  ngOnInit() {
    this.subscription = this.parent.get('cliente').valueChanges.subscribe( cliente => {
      if (cliente !== null) {
        this.parent.get('cfdiMail').setValue(cliente.email);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get comprador() {
    return this.parent.get('comprador').value;
  }
  get cliente() {
    return this.parent.get('cliente').value;
  }
  get kilos() {
    return _.round(this.parent.get('kilos').value, 2);
  }

}
