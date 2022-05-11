import { TestBed } from '@angular/core/testing';

import { EditInstructorPasswordService } from './edit-instructor-password.service';

describe('EditInstructorPasswordService', () => {
  let service: EditInstructorPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditInstructorPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
