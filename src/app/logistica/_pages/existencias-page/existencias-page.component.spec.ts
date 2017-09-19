import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenciasPageComponent } from './existencias-page.component';

describe('ExistenciasPageComponent', () => {
  let component: ExistenciasPageComponent;
  let fixture: ComponentFixture<ExistenciasPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenciasPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenciasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
