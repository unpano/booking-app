import { TestBed } from '@angular/core/testing';

import { AddRevisionMarkService } from './add-revision-mark.service';

describe('AddRevisionMarkService', () => {
  let service: AddRevisionMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRevisionMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
