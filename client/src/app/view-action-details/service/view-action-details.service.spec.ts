import { TestBed } from '@angular/core/testing';

import { ViewActionDetailsService } from './view-action-details.service';

describe('ViewActionDetailsService', () => {
  let service: ViewActionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewActionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
