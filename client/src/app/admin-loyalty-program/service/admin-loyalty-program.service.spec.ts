import { TestBed } from '@angular/core/testing';

import { AdminLoyaltyProgramService } from './admin-loyalty-program.service';

describe('AdminLoyaltyProgramService', () => {
  let service: AdminLoyaltyProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoyaltyProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
