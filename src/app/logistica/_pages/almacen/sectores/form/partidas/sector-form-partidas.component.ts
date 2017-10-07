import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-sector-form-partidas',
  templateUrl: 'sector-form-partidas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [' .partidas-grid-container { height: 300px;}']
})
export class SectorFormPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas;

  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  delete(index: number) {
    this.remove.emit(index);
  }
}
