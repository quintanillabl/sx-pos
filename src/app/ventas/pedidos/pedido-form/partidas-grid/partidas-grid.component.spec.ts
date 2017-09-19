import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidasGridComponent } from './partidas-grid.component';

describe('PartidasGridComponent', () => {
  let component: PartidasGridComponent;
  let fixture: ComponentFixture<PartidasGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidasGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
