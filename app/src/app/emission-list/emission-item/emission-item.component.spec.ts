import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionItemComponent } from './emission-item.component';

describe('EmissionItemComponent', () => {
  let component: EmissionItemComponent;
  let fixture: ComponentFixture<EmissionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmissionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});