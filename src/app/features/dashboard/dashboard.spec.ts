import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard';
import { provideRouter } from '@angular/router';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should toggle done state for one task', () => {
    const before = component.tasks().find((t) => t.id === 1);
    expect(before?.done).toBe(false);

    component.toggleTask(1);

    const after = component.tasks().find((t) => t.id === 1);
    expect(after?.done).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
