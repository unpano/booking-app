import { TestBed } from '@angular/core/testing';

import { AdminIncomeReservationsService } from './admin-income-reservations.service';

describe('AdminIncomeReservationsService', () => {
  let service: AdminIncomeReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminIncomeReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
