import { TestBed } from '@angular/core/testing';

import { AdminPunishClientsService } from './admin-punish-clients.service';

describe('AdminPunishClientsService', () => {
  let service: AdminPunishClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPunishClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
