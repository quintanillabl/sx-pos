import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaPageComponent } from './caja-page.component';

describe('CajaPageComponent', () => {
  let component: CajaPageComponent;
  let fixture: ComponentFixture<CajaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
