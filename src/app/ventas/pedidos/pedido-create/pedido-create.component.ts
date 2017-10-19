import { Component, OnInit } from '@angular/core';

import { AddNewClienteService } from "app/clientes/services/add-new-cliente/add-new-cliente.service";

@Component({
  selector: 'sx-pedido-create',
  template: `
    <sx-pedido-form (addNewCliente)="onAddNewCliente()" >
    </sx-pedido-form>
  `
})
export class PedidoCreateComponent implements OnInit {

  constructor(
    private addNewClienteService: AddNewClienteService
  ) { }

  ngOnInit() {
  }

  onSearch(term: string) {
    console.log('Buscando cliente: ', term);
    
  }

  onAddNewCliente() {
    this.addNewClienteService.newCliente();
  }

}
