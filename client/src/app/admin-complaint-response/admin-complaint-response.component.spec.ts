import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComplaintResponseComponent } from './admin-complaint-response.component';

describe('AdminComplaintResponseComponent', () => {
  let component: AdminComplaintResponseComponent;
  let fixture: ComponentFixture<AdminComplaintResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComplaintResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComplaintResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
