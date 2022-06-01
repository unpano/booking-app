import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectVerificationUserComponent } from './reject-verification-user.component';

describe('RejectVerificationUserComponent', () => {
  let component: RejectVerificationUserComponent;
  let fixture: ComponentFixture<RejectVerificationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectVerificationUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectVerificationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
