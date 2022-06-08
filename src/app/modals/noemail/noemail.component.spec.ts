import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoemailComponent } from './noemail.component';

describe('NoemailComponent', () => {
  let component: NoemailComponent;
  let fixture: ComponentFixture<NoemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
