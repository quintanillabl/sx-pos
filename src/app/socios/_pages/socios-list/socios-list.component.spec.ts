import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosListComponent } from './socios-list.component';

describe('SociosListComponent', () => {
  let component: SociosListComponent;
  let fixture: ComponentFixture<SociosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
