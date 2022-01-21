import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdventureComponent } from './profile-adventure.component';

describe('ProfileAdventureComponent', () => {
  let component: ProfileAdventureComponent;
  let fixture: ComponentFixture<ProfileAdventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAdventureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
