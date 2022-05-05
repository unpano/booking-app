import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActionAdventureComponent } from './new-action-adventure.component';

describe('NewActionAdventureComponent', () => {
  let component: NewActionAdventureComponent;
  let fixture: ComponentFixture<NewActionAdventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewActionAdventureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewActionAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
