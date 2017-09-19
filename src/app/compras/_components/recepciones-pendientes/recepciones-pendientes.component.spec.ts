import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionesPendientesComponent } from './recepciones-pendientes.component';

describe('RecepcionesPendientesComponent', () => {
  let component: RecepcionesPendientesComponent;
  let fixture: ComponentFixture<RecepcionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
