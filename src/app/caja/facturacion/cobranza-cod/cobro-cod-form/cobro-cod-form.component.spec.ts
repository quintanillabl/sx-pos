import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroCodFormComponent } from './cobro-cod-form.component';

describe('CobroCodFormComponent', () => {
  let component: CobroCodFormComponent;
  let fixture: ComponentFixture<CobroCodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobroCodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroCodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
