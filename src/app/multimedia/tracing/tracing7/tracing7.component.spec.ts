import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing7Component } from './tracing7.component';

describe('Tracing7Component', () => {
  let component: Tracing7Component;
  let fixture: ComponentFixture<Tracing7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
