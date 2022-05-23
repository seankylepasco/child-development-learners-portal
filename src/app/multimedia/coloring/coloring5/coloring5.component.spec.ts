import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring5Component } from './coloring5.component';

describe('Coloring5Component', () => {
  let component: Coloring5Component;
  let fixture: ComponentFixture<Coloring5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
