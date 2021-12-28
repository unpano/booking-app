import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivationComponent } from './deactivation.component';

describe('DeactivationComponent', () => {
  let component: DeactivationComponent;
  let fixture: ComponentFixture<DeactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
