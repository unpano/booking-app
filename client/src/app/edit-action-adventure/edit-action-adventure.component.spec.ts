import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionAdventureComponent } from './edit-action-adventure.component';

describe('EditActionAdventureComponent', () => {
  let component: EditActionAdventureComponent;
  let fixture: ComponentFixture<EditActionAdventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActionAdventureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
