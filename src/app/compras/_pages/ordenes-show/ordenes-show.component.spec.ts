import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesShowComponent } from './ordenes-show.component';

describe('OrdenesShowComponent', () => {
  let component: OrdenesShowComponent;
  let fixture: ComponentFixture<OrdenesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
