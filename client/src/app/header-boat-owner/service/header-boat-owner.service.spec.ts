import { TestBed } from '@angular/core/testing';

import { HeaderBoatOwnerService } from './header-boat-owner.service';

describe('HeaderBoatOwnerService', () => {
  let service: HeaderBoatOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderBoatOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
