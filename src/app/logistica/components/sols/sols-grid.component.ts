import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';

@Component({
  selector: 'sx-sols-grid',
  templateUrl: './sols-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolsGridComponent implements  OnInit {

  @Input() sols: SolicitudDeTraslado[];
  @Input() tipo = 'PENDIENTE';

  constructor() {}

  ngOnInit(): void {
  }

}
