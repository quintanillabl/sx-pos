import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenAddPartidaComponent } from './orden-add-partida.component';

describe('OrdenAddPartidaComponent', () => {
  let component: OrdenAddPartidaComponent;
  let fixture: ComponentFixture<OrdenAddPartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenAddPartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenAddPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
