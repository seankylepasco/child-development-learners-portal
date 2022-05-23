import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing4Component } from './tracing4.component';

describe('Tracing4Component', () => {
  let component: Tracing4Component;
  let fixture: ComponentFixture<Tracing4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
