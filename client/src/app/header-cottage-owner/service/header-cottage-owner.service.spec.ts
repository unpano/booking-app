import { TestBed } from '@angular/core/testing';

import { HeaderCottageOwnerService } from './header-cottage-owner.service';

describe('HeaderCottageOwnerService', () => {
  let service: HeaderCottageOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderCottageOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
