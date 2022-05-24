import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevisionMarkForInstructorComponent } from './add-revision-mark-for-instructor.component';

describe('AddRevisionMarkForInstructorComponent', () => {
  let component: AddRevisionMarkForInstructorComponent;
  let fixture: ComponentFixture<AddRevisionMarkForInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRevisionMarkForInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRevisionMarkForInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
