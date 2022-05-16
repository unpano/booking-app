import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsBookedActionComponent } from './clients-booked-action.component';

describe('ClientsBookedActionComponent', () => {
  let component: ClientsBookedActionComponent;
  let fixture: ComponentFixture<ClientsBookedActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsBookedActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsBookedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
