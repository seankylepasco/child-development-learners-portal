import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreActivityComponent } from './score-activity.component';

describe('ScoreActivityComponent', () => {
  let component: ScoreActivityComponent;
  let fixture: ComponentFixture<ScoreActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
