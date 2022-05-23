import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring6Component } from './coloring6.component';

describe('Coloring6Component', () => {
  let component: Coloring6Component;
  let fixture: ComponentFixture<Coloring6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
