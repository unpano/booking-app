import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRevisionsMarksForInstructorsComponent } from './all-revisions-marks-for-instructors.component';

describe('AllRevisionsMarksForInstructorsComponent', () => {
  let component: AllRevisionsMarksForInstructorsComponent;
  let fixture: ComponentFixture<AllRevisionsMarksForInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRevisionsMarksForInstructorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRevisionsMarksForInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
