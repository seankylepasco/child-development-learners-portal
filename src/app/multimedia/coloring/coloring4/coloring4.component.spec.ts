import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring4Component } from './coloring4.component';

describe('Coloring4Component', () => {
  let component: Coloring4Component;
  let fixture: ComponentFixture<Coloring4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
