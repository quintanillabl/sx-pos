import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolCreatePageComponent } from './sol-create-page.component';

describe('SolCreatePageComponent', () => {
  let component: SolCreatePageComponent;
  let fixture: ComponentFixture<SolCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
