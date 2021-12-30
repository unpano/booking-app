import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCottageOwnerComponent } from './report-cottage-owner.component';

describe('ReportCottageOwnerComponent', () => {
  let component: ReportCottageOwnerComponent;
  let fixture: ComponentFixture<ReportCottageOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCottageOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCottageOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
