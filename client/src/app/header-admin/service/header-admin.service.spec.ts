import { TestBed } from '@angular/core/testing';

import { HeaderAdminService } from './header-admin.service';

describe('HeaderAdminService', () => {
  let service: HeaderAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
