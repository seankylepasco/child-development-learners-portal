import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring8Component } from './coloring8.component';

describe('Coloring8Component', () => {
  let component: Coloring8Component;
  let fixture: ComponentFixture<Coloring8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
