import { TestBed } from '@angular/core/testing';

import { HeaderClientService } from './header-client.service';

describe('HeaderClientService', () => {
  let service: HeaderClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
