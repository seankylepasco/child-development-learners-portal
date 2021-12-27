import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolleesComponent } from './enrollees.component';

describe('EnrolleesComponent', () => {
  let component: EnrolleesComponent;
  let fixture: ComponentFixture<EnrolleesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolleesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
