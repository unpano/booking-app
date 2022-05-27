import { TestBed } from '@angular/core/testing';

import { DeletingRequestsService } from './deleting-requests.service';

describe('DeletingRequestsService', () => {
  let service: DeletingRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletingRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
