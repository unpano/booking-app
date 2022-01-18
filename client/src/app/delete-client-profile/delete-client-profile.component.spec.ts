import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientProfileComponent } from './delete-client-profile.component';

describe('DeleteClientProfileComponent', () => {
  let component: DeleteClientProfileComponent;
  let fixture: ComponentFixture<DeleteClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteClientProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
