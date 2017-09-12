import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendientesComponent } from './pedidos-pendientes.component';

describe('PedidosPendientesComponent', () => {
  let component: PedidosPendientesComponent;
  let fixture: ComponentFixture<PedidosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
