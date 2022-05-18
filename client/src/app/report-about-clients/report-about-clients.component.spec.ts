import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAboutClientsComponent } from './report-about-clients.component';

describe('ReportAboutClientsComponent', () => {
  let component: ReportAboutClientsComponent;
  let fixture: ComponentFixture<ReportAboutClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAboutClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAboutClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
