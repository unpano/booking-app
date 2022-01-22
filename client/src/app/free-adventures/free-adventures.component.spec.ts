import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAdventuresComponent } from './free-adventures.component';

describe('FreeAdventuresComponent', () => {
  let component: FreeAdventuresComponent;
  let fixture: ComponentFixture<FreeAdventuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAdventuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAdventuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
