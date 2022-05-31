import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBookingClientsComponent } from './calendar-booking-clients.component';

describe('CalendarBookingClientsComponent', () => {
  let component: CalendarBookingClientsComponent;
  let fixture: ComponentFixture<CalendarBookingClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarBookingClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBookingClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
