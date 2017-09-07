import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasMainPageComponent } from './compras-main-page.component';

describe('ComprasMainPageComponent', () => {
  let component: ComprasMainPageComponent;
  let fixture: ComponentFixture<ComprasMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
