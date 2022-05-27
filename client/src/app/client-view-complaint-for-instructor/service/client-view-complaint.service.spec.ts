import { TestBed } from '@angular/core/testing';

import { ClientViewComplaintService } from './client-view-complaint.service';

describe('ClientViewComplaintService', () => {
  let service: ClientViewComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientViewComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
