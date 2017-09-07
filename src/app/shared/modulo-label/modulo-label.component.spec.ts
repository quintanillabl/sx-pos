import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloLabelComponent } from './modulo-label.component';

describe('ModuloLabelComponent', () => {
  let component: ModuloLabelComponent;
  let fixture: ComponentFixture<ModuloLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
