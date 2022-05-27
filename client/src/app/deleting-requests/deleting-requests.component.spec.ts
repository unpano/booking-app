import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletingRequestsComponent } from './deleting-requests.component';

describe('DeletingRequestsComponent', () => {
  let component: DeletingRequestsComponent;
  let fixture: ComponentFixture<DeletingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletingRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
