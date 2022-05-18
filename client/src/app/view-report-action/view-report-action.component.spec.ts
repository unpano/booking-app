import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportActionComponent } from './view-report-action.component';

describe('ViewReportActionComponent', () => {
  let component: ViewReportActionComponent;
  let fixture: ComponentFixture<ViewReportActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
