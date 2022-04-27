import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdventureFishingClassComponent } from './profile-adventure-fishing-class.component';

describe('ProfileAdventureFishingClassComponent', () => {
  let component: ProfileAdventureFishingClassComponent;
  let fixture: ComponentFixture<ProfileAdventureFishingClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAdventureFishingClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdventureFishingClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
