import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCottageComponent } from './delete-cottage.component';

describe('DeleteCottageComponent', () => {
  let component: DeleteCottageComponent;
  let fixture: ComponentFixture<DeleteCottageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCottageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCottageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
