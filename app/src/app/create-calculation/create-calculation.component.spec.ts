import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCalculationComponent } from './create-calculation.component';

describe('CreateCalculationComponent', () => {
  let component: CreateCalculationComponent;
  let fixture: ComponentFixture<CreateCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
