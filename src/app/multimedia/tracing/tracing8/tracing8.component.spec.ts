import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing8Component } from './tracing8.component';

describe('Tracing8Component', () => {
  let component: Tracing8Component;
  let fixture: ComponentFixture<Tracing8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
