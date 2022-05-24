import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActionDetailsComponent } from './view-action-details.component';

describe('ViewActionDetailsComponent', () => {
  let component: ViewActionDetailsComponent;
  let fixture: ComponentFixture<ViewActionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
