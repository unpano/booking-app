import { TestBed } from '@angular/core/testing';

import { HomePageInstructorService } from './home-page-instructor.service';

describe('HomePageInstructorService', () => {
  let service: HomePageInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
