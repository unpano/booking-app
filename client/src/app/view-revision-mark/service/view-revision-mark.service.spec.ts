import { TestBed } from '@angular/core/testing';

import { ViewRevisionMarkService } from './view-revision-mark.service';

describe('ViewRevisionMarkService', () => {
  let service: ViewRevisionMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewRevisionMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
