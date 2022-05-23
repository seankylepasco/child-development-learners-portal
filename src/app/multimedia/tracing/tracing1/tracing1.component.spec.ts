import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing1Component } from './tracing1.component';

describe('Tracing1Component', () => {
  let component: Tracing1Component;
  let fixture: ComponentFixture<Tracing1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
