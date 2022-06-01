import { TestBed } from '@angular/core/testing';

import { RejectVerificationUserService } from './reject-verification-user.service';

describe('RejectVerificationUserService', () => {
  let service: RejectVerificationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectVerificationUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
