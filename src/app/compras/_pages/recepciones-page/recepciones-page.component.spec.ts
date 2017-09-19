import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionesPageComponent } from './recepciones-page.component';

describe('RecepcionesPageComponent', () => {
  let component: RecepcionesPageComponent;
  let fixture: ComponentFixture<RecepcionesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
