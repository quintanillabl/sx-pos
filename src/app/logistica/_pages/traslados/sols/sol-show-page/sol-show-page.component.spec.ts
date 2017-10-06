import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolShowPageComponent } from './sol-show-page.component';

describe('SolShowPageComponent', () => {
  let component: SolShowPageComponent;
  let fixture: ComponentFixture<SolShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolShowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
