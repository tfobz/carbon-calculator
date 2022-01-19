import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModuleComponent } from './create-module.component';

describe('CreateModuleComponent', () => {
  let component: CreateModuleComponent;
  let fixture: ComponentFixture<CreateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
