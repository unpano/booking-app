import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCottageComponent } from './profile-cottage.component';

describe('ProfileCottageComponent', () => {
  let component: ProfileCottageComponent;
  let fixture: ComponentFixture<ProfileCottageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCottageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCottageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
