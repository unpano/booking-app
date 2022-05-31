import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoyaltyChangeProgramComponent } from './admin-loyalty-change-program.component';

describe('AdminLoyaltyChangeProgramComponent', () => {
  let component: AdminLoyaltyChangeProgramComponent;
  let fixture: ComponentFixture<AdminLoyaltyChangeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoyaltyChangeProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoyaltyChangeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
