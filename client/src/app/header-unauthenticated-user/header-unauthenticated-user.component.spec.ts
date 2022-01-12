import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnauthenticatedUserComponent } from './header-unauthenticated-user.component';

describe('HeaderUnauthenticatedUserComponent', () => {
  let component: HeaderUnauthenticatedUserComponent;
  let fixture: ComponentFixture<HeaderUnauthenticatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUnauthenticatedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUnauthenticatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
