import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncepostComponent } from './announcepost.component';

describe('AnnouncepostComponent', () => {
  let component: AnnouncepostComponent;
  let fixture: ComponentFixture<AnnouncepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
