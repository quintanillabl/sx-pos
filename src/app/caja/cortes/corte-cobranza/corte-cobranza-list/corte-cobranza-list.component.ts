import { Component, OnInit, Input } from '@angular/core';
import { CorteCobranza } from '@siipapx/caja/models/corteCobranza';

@Component({
  selector: 'sx-corte-cobranza-list',
  templateUrl: './corte-cobranza-list.component.html',
  styleUrls: ['./corte-cobranza-list.component.scss']
})
export class CorteCobranzaListComponent implements OnInit {

  @Input() cortes: CorteCobranza[] = [];

  constructor() { }

  ngOnInit() {
  }

  show(corte) {
    console.log('Show corte....');
  }

}
