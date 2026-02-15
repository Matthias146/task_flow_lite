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
  it('should filter open tasks', () => {
    component.toggleTask(1);

    component.setFilter('open');
    const result = component.filteredTasks();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.done === false)).toBe(true);
  });

  it('should reset demo data and set filter to all', () => {
    component.setFilter('done');
    component.toggleTask(1);
    component.resetDemoData();

    expect(component.filter()).toBe('all');
    expect(component.tasks().length).toBe(3);
    expect(component.editingTaskId()).toBe(null);
  });

  it('should delete a task', () => {
    const before = component.tasks().length;
    component.deleteTask(2);
    const after = component.tasks().length;
    expect(after).toBe(before - 1);

    const deleted = component.tasks().find((t) => t.id === 2);
    expect(deleted).toBeUndefined();
  });

  it('should not save edit when title is empty', () => {
    const original = component.tasks().find((t) => t.id === 1);
    expect(original).toBeTruthy();

    component.startEdit(original!);
    component.setDraftTitle('  ');
    component.setDraftDescription('changed description');

    component.saveEdit(1);

    const after = component.tasks().find((t) => t.id === 1);
    expect(after?.title).toBe(original!.title);
    expect(component.editError()).toBe('Title is required');
    expect(component.editingTaskId()).toBe(1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
