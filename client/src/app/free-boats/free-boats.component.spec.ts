import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeBoatsComponent } from './free-boats.component';

describe('FreeBoatsComponent', () => {
  let component: FreeBoatsComponent;
  let fixture: ComponentFixture<FreeBoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeBoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
