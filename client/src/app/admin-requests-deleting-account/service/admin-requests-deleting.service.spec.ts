import { TestBed } from '@angular/core/testing';

import { AdminRequestsDeletingService } from './admin-requests-deleting.service';

describe('AdminRequestsDeletingService', () => {
  let service: AdminRequestsDeletingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRequestsDeletingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
