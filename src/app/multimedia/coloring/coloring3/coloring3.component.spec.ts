import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring3Component } from './coloring3.component';

describe('Coloring3Component', () => {
  let component: Coloring3Component;
  let fixture: ComponentFixture<Coloring3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
