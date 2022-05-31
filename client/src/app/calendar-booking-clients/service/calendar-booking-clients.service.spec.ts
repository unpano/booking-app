import { TestBed } from '@angular/core/testing';

import { CalendarBookingClientsService } from './calendar-booking-clients.service';

describe('CalendarBookingClientsService', () => {
  let service: CalendarBookingClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarBookingClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
