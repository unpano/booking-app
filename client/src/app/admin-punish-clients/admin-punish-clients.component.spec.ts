import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPunishClientsComponent } from './admin-punish-clients.component';

describe('AdminPunishClientsComponent', () => {
  let component: AdminPunishClientsComponent;
  let fixture: ComponentFixture<AdminPunishClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPunishClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPunishClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
