import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroFormComponent } from './cobro-form.component';

describe('CobroFormComponent', () => {
  let component: CobroFormComponent;
  let fixture: ComponentFixture<CobroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
