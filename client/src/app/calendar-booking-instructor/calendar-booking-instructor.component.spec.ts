import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBookingInstructorComponent } from './calendar-booking-instructor.component';

describe('CalendarBookingInstructorComponent', () => {
  let component: CalendarBookingInstructorComponent;
  let fixture: ComponentFixture<CalendarBookingInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarBookingInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBookingInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
