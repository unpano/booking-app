import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureReservationFormComponent } from './adventure-reservation-form.component';

describe('AdventureReservationFormComponent', () => {
  let component: AdventureReservationFormComponent;
  let fixture: ComponentFixture<AdventureReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureReservationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
