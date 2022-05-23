import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIncomeReservationsComponent } from './admin-income-reservations.component';

describe('AdminIncomeReservationsComponent', () => {
  let component: AdminIncomeReservationsComponent;
  let fixture: ComponentFixture<AdminIncomeReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIncomeReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIncomeReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
