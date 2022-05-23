import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coloring2Component } from './coloring2.component';

describe('Coloring2Component', () => {
  let component: Coloring2Component;
  let fixture: ComponentFixture<Coloring2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Coloring2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Coloring2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
