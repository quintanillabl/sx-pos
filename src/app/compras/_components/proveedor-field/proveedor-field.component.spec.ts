import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFieldComponent } from './proveedor-field.component';

describe('ProveedorFieldComponent', () => {
  let component: ProveedorFieldComponent;
  let fixture: ComponentFixture<ProveedorFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
