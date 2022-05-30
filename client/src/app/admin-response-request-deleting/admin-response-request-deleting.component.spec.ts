import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResponseRequestDeletingComponent } from './admin-response-request-deleting.component';

describe('AdminResponseRequestDeletingComponent', () => {
  let component: AdminResponseRequestDeletingComponent;
  let fixture: ComponentFixture<AdminResponseRequestDeletingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResponseRequestDeletingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResponseRequestDeletingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
