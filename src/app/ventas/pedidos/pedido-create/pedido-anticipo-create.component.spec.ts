import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAnticipoCreateComponent } from './pedido-anticipo-create.component';

describe('PedidoAnticipoCreateComponent', () => {
  let component: PedidoAnticipoCreateComponent;
  let fixture: ComponentFixture<PedidoAnticipoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoAnticipoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoAnticipoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
