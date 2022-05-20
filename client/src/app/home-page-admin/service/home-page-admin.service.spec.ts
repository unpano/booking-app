import { TestBed } from '@angular/core/testing';

import { HomePageAdminService } from './home-page-admin.service';

describe('HomePageAdminService', () => {
  let service: HomePageAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
