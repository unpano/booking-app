import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCottageOwnerComponent } from './header-cottage-owner.component';

describe('HeaderCottageOwnerComponent', () => {
  let component: HeaderCottageOwnerComponent;
  let fixture: ComponentFixture<HeaderCottageOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCottageOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCottageOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
