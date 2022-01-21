import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageReservationFormComponent } from './cottage-reservation-form.component';

describe('CottageReservationFormComponent', () => {
  let component: CottageReservationFormComponent;
  let fixture: ComponentFixture<CottageReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CottageReservationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CottageReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
