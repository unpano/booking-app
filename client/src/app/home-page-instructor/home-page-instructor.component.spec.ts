import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageInstructorComponent } from './home-page-instructor.component';

describe('HomePageInstructorComponent', () => {
  let component: HomePageInstructorComponent;
  let fixture: ComponentFixture<HomePageInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
