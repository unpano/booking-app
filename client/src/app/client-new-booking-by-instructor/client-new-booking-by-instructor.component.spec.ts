import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewBookingByInstructorComponent } from './client-new-booking-by-instructor.component';

describe('ClientNewBookingByInstructorComponent', () => {
  let component: ClientNewBookingByInstructorComponent;
  let fixture: ComponentFixture<ClientNewBookingByInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNewBookingByInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewBookingByInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
