import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCottagePastReservationsComponent } from './list-cottage-past-reservations.component';

describe('ListCottagePastReservationsComponent', () => {
  let component: ListCottagePastReservationsComponent;
  let fixture: ComponentFixture<ListCottagePastReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCottagePastReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCottagePastReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
