import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevisionMarkComponent } from './view-revision-mark.component';

describe('ViewRevisionMarkComponent', () => {
  let component: ViewRevisionMarkComponent;
  let fixture: ComponentFixture<ViewRevisionMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRevisionMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevisionMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
