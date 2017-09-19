import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionesRegistradasComponent } from './recepciones-registradas.component';

describe('RecepcionesRegistradasComponent', () => {
  let component: RecepcionesRegistradasComponent;
  let fixture: ComponentFixture<RecepcionesRegistradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionesRegistradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionesRegistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
