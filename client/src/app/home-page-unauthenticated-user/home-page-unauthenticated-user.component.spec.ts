import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageUnauthenticatedUserComponent } from './home-page-unauthenticated-user.component';

describe('HomePageUnauthenticatedUserComponent', () => {
  let component: HomePageUnauthenticatedUserComponent;
  let fixture: ComponentFixture<HomePageUnauthenticatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageUnauthenticatedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageUnauthenticatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
