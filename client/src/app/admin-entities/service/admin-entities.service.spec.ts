import { TestBed } from '@angular/core/testing';

import { AdminEntitiesService } from './admin-entities.service';

describe('AdminEntitiesService', () => {
  let service: AdminEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
