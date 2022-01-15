import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoatPastReservationsComponent } from './list-boat-past-reservations.component';

describe('ListBoatPastReservationsComponent', () => {
  let component: ListBoatPastReservationsComponent;
  let fixture: ComponentFixture<ListBoatPastReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBoatPastReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoatPastReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
