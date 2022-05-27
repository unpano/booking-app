import { TestBed } from '@angular/core/testing';

import { AddComplaintService } from './add-complaint.service';

describe('AddComplaintService', () => {
  let service: AddComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
