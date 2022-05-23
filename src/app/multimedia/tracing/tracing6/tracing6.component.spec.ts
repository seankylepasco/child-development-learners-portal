import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracing6Component } from './tracing6.component';

describe('Tracing6Component', () => {
  let component: Tracing6Component;
  let fixture: ComponentFixture<Tracing6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tracing6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tracing6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
