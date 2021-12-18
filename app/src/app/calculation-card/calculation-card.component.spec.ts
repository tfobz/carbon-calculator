import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationCardComponent } from './calculation-card.component';

describe('CalculationCardComponent', () => {
  let component: CalculationCardComponent;
  let fixture: ComponentFixture<CalculationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
