import { TestBed } from '@angular/core/testing';

import { AllRevisionsMarksService } from './all-revisions-marks.service';

describe('AllRevisionsMarksService', () => {
  let service: AllRevisionsMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllRevisionsMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
