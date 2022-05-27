import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestsDeletingAccountComponent } from './admin-requests-deleting-account.component';

describe('AdminRequestsDeletingAccountComponent', () => {
  let component: AdminRequestsDeletingAccountComponent;
  let fixture: ComponentFixture<AdminRequestsDeletingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestsDeletingAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestsDeletingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
