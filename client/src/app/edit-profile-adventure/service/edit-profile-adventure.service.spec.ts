import { TestBed } from '@angular/core/testing';

import { EditProfileAdventureService } from './edit-profile-adventure.service';

describe('EditProfileAdventureService', () => {
  let service: EditProfileAdventureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileAdventureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
