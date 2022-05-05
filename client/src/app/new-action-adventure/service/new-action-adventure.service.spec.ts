import { TestBed } from '@angular/core/testing';

import { NewActionAdventureService } from './new-action-adventure.service';

describe('NewActionAdventureService', () => {
  let service: NewActionAdventureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewActionAdventureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
