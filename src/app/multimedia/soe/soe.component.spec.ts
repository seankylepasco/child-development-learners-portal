import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoeComponent } from './soe.component';

describe('SoeComponent', () => {
  let component: SoeComponent;
  let fixture: ComponentFixture<SoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
