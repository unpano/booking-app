import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCottageOwnerComponent } from './home-page-cottage-owner.component';

describe('HomePageCottageOwnerComponent', () => {
  let component: HomePageCottageOwnerComponent;
  let fixture: ComponentFixture<HomePageCottageOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageCottageOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageCottageOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
