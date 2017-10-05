import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComsPageComponent } from './coms-page.component';

describe('ComsPageComponent', () => {
  let component: ComsPageComponent;
  let fixture: ComponentFixture<ComsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
