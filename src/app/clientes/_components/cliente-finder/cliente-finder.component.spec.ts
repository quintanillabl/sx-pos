import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFinderComponent } from './cliente-finder.component';

describe('ClienteFinderComponent', () => {
  let component: ClienteFinderComponent;
  let fixture: ComponentFixture<ClienteFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
