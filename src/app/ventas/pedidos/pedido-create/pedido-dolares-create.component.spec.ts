import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDolaresCreateComponent } from './pedido-dolares-create.component';

describe('PedidoDolaresCreateComponent', () => {
  let component: PedidoDolaresCreateComponent;
  let fixture: ComponentFixture<PedidoDolaresCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDolaresCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDolaresCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
