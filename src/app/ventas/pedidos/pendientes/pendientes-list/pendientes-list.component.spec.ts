import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesListComponent } from './pendientes-list.component';

describe('PendientesListComponent', () => {
  let component: PendientesListComponent;
  let fixture: ComponentFixture<PendientesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendientesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendientesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
