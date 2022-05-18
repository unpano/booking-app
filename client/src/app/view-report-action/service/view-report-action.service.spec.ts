import { TestBed } from '@angular/core/testing';

import { ViewReportActionService } from './view-report-action.service';

describe('ViewReportActionService', () => {
  let service: ViewReportActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewReportActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
