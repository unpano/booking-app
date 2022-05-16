import { TestBed } from '@angular/core/testing';

import { ClientsBookedActionService } from './clients-booked-action.service';

describe('ClientsBookedActionService', () => {
  let service: ClientsBookedActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsBookedActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
