import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionCalculationComponent } from './emission-calculation.component';

describe('EmissionCalculationComponent', () => {
  let component: EmissionCalculationComponent;
  let fixture: ComponentFixture<EmissionCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmissionCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
