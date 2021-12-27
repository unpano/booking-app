import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBoatOwnerComponent } from './header-boat-owner.component';

describe('HeaderBoatOwnerComponent', () => {
  let component: HeaderBoatOwnerComponent;
  let fixture: ComponentFixture<HeaderBoatOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBoatOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBoatOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
