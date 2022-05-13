import { TestBed } from '@angular/core/testing';

import { ClientReservationsService } from './client-reservations.service';

describe('ClientReservationsService', () => {
  let service: ClientReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
