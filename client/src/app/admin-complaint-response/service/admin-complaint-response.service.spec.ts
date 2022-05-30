import { TestBed } from '@angular/core/testing';

import { AdminComplaintResponseService } from './admin-complaint-response.service';

describe('AdminComplaintResponseService', () => {
  let service: AdminComplaintResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminComplaintResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
