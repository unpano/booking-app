import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComplaintForInstructorComponent } from './add-complaint-for-instructor.component';

describe('AddComplaintForInstructorComponent', () => {
  let component: AddComplaintForInstructorComponent;
  let fixture: ComponentFixture<AddComplaintForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComplaintForInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplaintForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
