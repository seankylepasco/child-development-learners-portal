import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing2Component } from './tracing2.component';

describe('Tracing2Component', () => {
  let component: Tracing2Component;
  let fixture: ComponentFixture<Tracing2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
