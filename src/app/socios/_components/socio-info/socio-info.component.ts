import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sx-socio-quick-info',
  templateUrl: './socio-info.component.html',
  styleUrls: ['./socio-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocioQuickInfoComponent implements OnInit {

  @Input() socio;

  constructor() { }

  ngOnInit() {}

}
