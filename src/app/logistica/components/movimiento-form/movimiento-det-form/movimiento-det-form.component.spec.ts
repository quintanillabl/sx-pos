import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoDetFormComponent } from './movimiento-det-form.component';

describe('MovimientoDetFormComponent', () => {
  let component: MovimientoDetFormComponent;
  let fixture: ComponentFixture<MovimientoDetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoDetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoDetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
