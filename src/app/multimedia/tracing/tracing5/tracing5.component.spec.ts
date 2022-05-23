import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing5Component } from './tracing5.component';

describe('Tracing5Component', () => {
  let component: Tracing5Component;
  let fixture: ComponentFixture<Tracing5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
