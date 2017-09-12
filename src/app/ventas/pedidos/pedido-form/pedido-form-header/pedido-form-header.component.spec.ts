import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFormHeaderComponent } from './pedido-form-header.component';

describe('PedidoFormHeaderComponent', () => {
  let component: PedidoFormHeaderComponent;
  let fixture: ComponentFixture<PedidoFormHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoFormHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
