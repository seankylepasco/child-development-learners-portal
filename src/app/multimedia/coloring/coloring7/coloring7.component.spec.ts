import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring7Component } from './coloring7.component';

describe('Coloring7Component', () => {
  let component: Coloring7Component;
  let fixture: ComponentFixture<Coloring7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
