import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring1Component } from './coloring1.component';

describe('Coloring1Component', () => {
  let component: Coloring1Component;
  let fixture: ComponentFixture<Coloring1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
