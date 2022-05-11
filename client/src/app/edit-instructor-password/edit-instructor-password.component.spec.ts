import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructorPasswordComponent } from './edit-instructor-password.component';

describe('EditInstructorPasswordComponent', () => {
  let component: EditInstructorPasswordComponent;
  let fixture: ComponentFixture<EditInstructorPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInstructorPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstructorPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
