import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileCottageComponent } from './client-profile-cottage.component';

describe('ClientProfileCottageComponent', () => {
  let component: ClientProfileCottageComponent;
  let fixture: ComponentFixture<ClientProfileCottageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProfileCottageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileCottageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
