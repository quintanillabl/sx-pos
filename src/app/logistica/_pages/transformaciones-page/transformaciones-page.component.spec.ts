import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionesPageComponent } from './transformaciones-page.component';

describe('TransformacionesPageComponent', () => {
  let component: TransformacionesPageComponent;
  let fixture: ComponentFixture<TransformacionesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformacionesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
