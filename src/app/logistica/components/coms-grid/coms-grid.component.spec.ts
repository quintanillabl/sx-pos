import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComsGridComponent } from './coms-grid.component';

describe('ComsGridComponent', () => {
  let component: ComsGridComponent;
  let fixture: ComponentFixture<ComsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
