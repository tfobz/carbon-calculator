import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCalculationListComponent } from './specific-calculation-list.component';

describe('SpecificCalculationListComponent', () => {
  let component: SpecificCalculationListComponent;
  let fixture: ComponentFixture<SpecificCalculationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificCalculationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificCalculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
