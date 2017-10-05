import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecFormComponent } from './dec-form.component';

describe('DecFormComponent', () => {
  let component: DecFormComponent;
  let fixture: ComponentFixture<DecFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
