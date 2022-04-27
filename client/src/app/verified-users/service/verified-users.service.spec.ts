import { TestBed } from '@angular/core/testing';

import { VerifiedUsersService } from './verified-users.service';

describe('VerifiedUsersService', () => {
  let service: VerifiedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifiedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
