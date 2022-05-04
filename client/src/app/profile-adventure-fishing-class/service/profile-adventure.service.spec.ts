import { TestBed } from '@angular/core/testing';

import { ProfileAdventureService } from './profile-adventure.service';

describe('ProfileAdventureService', () => {
  let service: ProfileAdventureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileAdventureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
