import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCreatePageComponent } from './ordenes-create-page.component';

describe('OrdenesCreatePageComponent', () => {
  let component: OrdenesCreatePageComponent;
  let fixture: ComponentFixture<OrdenesCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
