import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing3Component } from './tracing3.component';

describe('Tracing3Component', () => {
  let component: Tracing3Component;
  let fixture: ComponentFixture<Tracing3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
