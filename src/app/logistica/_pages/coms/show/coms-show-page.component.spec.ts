import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComsShowPageComponent } from './coms-show-page.component';

describe('ComsShowPageComponent', () => {
  let component: ComsShowPageComponent;
  let fixture: ComponentFixture<ComsShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComsShowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComsShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
