import { TestBed } from '@angular/core/testing';

import { ProfileInstructorService } from './profile-instructor.service';

describe('ProfileInstructorService', () => {
  let service: ProfileInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
