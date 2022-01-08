import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCottageFutureReservationsComponent } from './list-cottage-future-reservations.component';

describe('ListCottageFutureReservationsComponent', () => {
  let component: ListCottageFutureReservationsComponent;
  let fixture: ComponentFixture<ListCottageFutureReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCottageFutureReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCottageFutureReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
