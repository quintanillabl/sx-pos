import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-clientes-search',
  templateUrl: './clientes-search.component.html',
  styleUrls: ['./clientes-search.component.scss']
})
export class ClientesSearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  @Output() tarjeta = new EventEmitter<string>();

  @Input() clientes;

  constructor() { }

  ngOnInit() {
  }

  searchCliente(term: string) {
    this.search.emit(term);
  }

  searchTarjeta(){
    this.tarjeta.emit('Buscar tarjeta');
  }
}
