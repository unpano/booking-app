import { TestBed } from '@angular/core/testing';

import { AdminLoyaltyChangeService } from './admin-loyalty-change.service';

describe('AdminLoyaltyChangeService', () => {
  let service: AdminLoyaltyChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoyaltyChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
