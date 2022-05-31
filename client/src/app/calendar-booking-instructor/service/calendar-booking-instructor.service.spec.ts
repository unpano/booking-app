import { TestBed } from '@angular/core/testing';

import { CalendarBookingInstructorService } from './calendar-booking-instructor.service';

describe('CalendarBookingInstructorService', () => {
  let service: CalendarBookingInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarBookingInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
