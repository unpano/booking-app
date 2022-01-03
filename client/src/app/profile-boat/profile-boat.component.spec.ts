import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBoatComponent } from './profile-boat.component';

describe('ProfileBoatComponent', () => {
  let component: ProfileBoatComponent;
  let fixture: ComponentFixture<ProfileBoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
