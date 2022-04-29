import { TestBed } from '@angular/core/testing';

import { NewAdventureFishingService } from './new-adventure-fishing.service';

describe('NewAdventureFishingService', () => {
  let service: NewAdventureFishingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAdventureFishingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
