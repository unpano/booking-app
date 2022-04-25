import { TestBed } from '@angular/core/testing';

import { UnverifUsersService } from './unverif-users.service';

describe('UnverifUsersService', () => {
  let service: UnverifUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnverifUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
