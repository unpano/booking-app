import { TestBed } from '@angular/core/testing';

import { ClientNewBookingService } from './client-new-booking.service';

describe('ClientNewBookingService', () => {
  let service: ClientNewBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNewBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
