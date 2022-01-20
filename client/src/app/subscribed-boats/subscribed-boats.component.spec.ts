import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedBoatsComponent } from './subscribed-boats.component';

describe('SubscribedBoatsComponent', () => {
  let component: SubscribedBoatsComponent;
  let fixture: ComponentFixture<SubscribedBoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedBoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
