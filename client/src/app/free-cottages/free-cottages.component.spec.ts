import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCottagesComponent } from './free-cottages.component';

describe('FreeCottagesComponent', () => {
  let component: FreeCottagesComponent;
  let fixture: ComponentFixture<FreeCottagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeCottagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCottagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
