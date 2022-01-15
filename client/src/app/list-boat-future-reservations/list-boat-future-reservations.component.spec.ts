import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoatFutureReservationsComponent } from './list-boat-future-reservations.component';

describe('ListBoatFutureReservationsComponent', () => {
  let component: ListBoatFutureReservationsComponent;
  let fixture: ComponentFixture<ListBoatFutureReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBoatFutureReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoatFutureReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
