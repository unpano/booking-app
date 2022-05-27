import { TestBed } from '@angular/core/testing';

import { HeaderInstructorService } from './header-instructor.service';

describe('HeaderInstructorService', () => {
  let service: HeaderInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
