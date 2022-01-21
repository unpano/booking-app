import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActivationComponent } from './profile-activation.component';

describe('ProfileActivationComponent', () => {
  let component: ProfileActivationComponent;
  let fixture: ComponentFixture<ProfileActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
