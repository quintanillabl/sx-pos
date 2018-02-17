import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-inv-facturas-page',
  templateUrl: './inv-facturas-page.component.html',
  styles: [`
    .page {
      height: 85vh;
    }
  `]
})
export class InvFacturasPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  search(term) {}

}
