import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPageComponent } from './inventarios-page.component';

describe('InventariosPageComponent', () => {
  let component: InventariosPageComponent;
  let fixture: ComponentFixture<InventariosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventariosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
