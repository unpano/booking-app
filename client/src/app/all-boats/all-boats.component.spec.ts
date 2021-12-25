import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoatsComponent } from './all-boats.component';

describe('AllBoatsComponent', () => {
  let component: AllBoatsComponent;
  let fixture: ComponentFixture<AllBoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
