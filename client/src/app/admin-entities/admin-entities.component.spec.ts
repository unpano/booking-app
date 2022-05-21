import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntitiesComponent } from './admin-entities.component';

describe('AdminEntitiesComponent', () => {
  let component: AdminEntitiesComponent;
  let fixture: ComponentFixture<AdminEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
