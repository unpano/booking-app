import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoyaltyProgramComponent } from './admin-loyalty-program.component';

describe('AdminLoyaltyProgramComponent', () => {
  let component: AdminLoyaltyProgramComponent;
  let fixture: ComponentFixture<AdminLoyaltyProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoyaltyProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoyaltyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
