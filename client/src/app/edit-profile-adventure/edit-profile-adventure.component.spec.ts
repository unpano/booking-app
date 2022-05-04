import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileAdventureComponent } from './edit-profile-adventure.component';

describe('EditProfileAdventureComponent', () => {
  let component: EditProfileAdventureComponent;
  let fixture: ComponentFixture<EditProfileAdventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileAdventureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
