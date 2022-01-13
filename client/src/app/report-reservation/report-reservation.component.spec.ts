import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReservationComponent } from './report-reservation.component';

describe('ReportReservationComponent', () => {
  let component: ReportReservationComponent;
  let fixture: ComponentFixture<ReportReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
