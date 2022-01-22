import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistCottageComponent } from './pricelist-cottage.component';

describe('PricelistCottageComponent', () => {
  let component: PricelistCottageComponent;
  let fixture: ComponentFixture<PricelistCottageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricelistCottageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistCottageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
