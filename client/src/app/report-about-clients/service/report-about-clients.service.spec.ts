import { TestBed } from '@angular/core/testing';

import { ReportAboutClientsService } from './report-about-clients.service';

describe('ReportAboutClientsService', () => {
  let service: ReportAboutClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportAboutClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
