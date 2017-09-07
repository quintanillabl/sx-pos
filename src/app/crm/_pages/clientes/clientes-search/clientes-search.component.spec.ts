import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesSearchComponent } from './clientes-search.component';

describe('ClientesSearchComponent', () => {
  let component: ClientesSearchComponent;
  let fixture: ComponentFixture<ClientesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
