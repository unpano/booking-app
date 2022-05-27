import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewComplaintForInstructorComponent } from './client-view-complaint-for-instructor.component';

describe('ClientViewComplaintForInstructorComponent', () => {
  let component: ClientViewComplaintForInstructorComponent;
  let fixture: ComponentFixture<ClientViewComplaintForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewComplaintForInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientViewComplaintForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
