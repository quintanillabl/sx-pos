import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibleFormComponent } from './disponible-form.component';

describe('DisponibleFormComponent', () => {
  let component: DisponibleFormComponent;
  let fixture: ComponentFixture<DisponibleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
