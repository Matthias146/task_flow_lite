import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSignalForm } from './dashboard-signal-form';

describe('DashboardSignalForm', () => {
  let component: DashboardSignalForm;
  let fixture: ComponentFixture<DashboardSignalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSignalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSignalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
