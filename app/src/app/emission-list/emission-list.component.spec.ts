import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionListComponent } from './emission-list.component';

describe('EmissionListComponent', () => {
  let component: EmissionListComponent;
  let fixture: ComponentFixture<EmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
