import { TestBed } from '@angular/core/testing';

import { EditActionAdventureService } from './edit-action-adventure.service';

describe('EditActionAdventureService', () => {
  let service: EditActionAdventureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditActionAdventureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
