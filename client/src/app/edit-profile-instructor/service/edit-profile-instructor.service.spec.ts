import { TestBed } from '@angular/core/testing';

import { EditProfileInstructorService } from './edit-profile-instructor.service';

describe('EditProfileInstructorService', () => {
  let service: EditProfileInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
