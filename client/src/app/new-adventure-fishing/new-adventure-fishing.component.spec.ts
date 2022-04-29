import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdventureFishingComponent } from './new-adventure-fishing.component';

describe('NewAdventureFishingComponent', () => {
  let component: NewAdventureFishingComponent;
  let fixture: ComponentFixture<NewAdventureFishingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdventureFishingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdventureFishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
