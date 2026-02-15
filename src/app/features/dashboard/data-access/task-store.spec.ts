import { TestBed } from '@angular/core/testing';

import { TaskStore } from './task-store';

describe('TaskStore', () => {
  let service: TaskStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStore);
  });

  it('should toggle done state for one task', () => {
    const before = service.tasks().find((t) => t.id === 1);
    expect(before?.done).toBe(false);

    service.toggleTask(1);

    const after = service.tasks().find((t) => t.id === 1);
    expect(after?.done).toBe(true);
  });
  it('should filter open tasks', () => {
    service.toggleTask(1);

    service.setFilter('open');
    const result = service.filteredTasks();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.done === false)).toBe(true);
  });

  it('should reset demo data and set filter to all', () => {
    service.setFilter('done');
    service.toggleTask(1);
    service.resetDemoData();

    expect(service.filter()).toBe('all');
    expect(service.tasks().length).toBe(3);
    expect(service.editingTaskId()).toBe(null);
  });

  it('should delete a task', () => {
    const before = service.tasks().length;
    service.deleteTask(2);
    const after = service.tasks().length;
    expect(after).toBe(before - 1);

    const deleted = service.tasks().find((t) => t.id === 2);
    expect(deleted).toBeUndefined();
  });

  it('should not save edit when title is empty', () => {
    const original = service.tasks().find((t) => t.id === 1);
    expect(original).toBeTruthy();

    service.startEdit(original!);
    service.setDraftTitle('  ');
    service.setDraftDescription('changed description');

    service.saveEdit(1);

    const after = service.tasks().find((t) => t.id === 1);
    expect(after?.title).toBe(original!.title);
    expect(service.editError()).toBe('Title is required');
    expect(service.editingTaskId()).toBe(1);
  });

  it('should not save edit when title is shorter than 3 characters', () => {
    const original = service.tasks().find((t) => t.id === 1);
    expect(original).toBeTruthy();

    service.startEdit(original!);
    service.setDraftTitle('ab');
    service.setDraftDescription('changed');

    service.saveEdit(1);

    const after = service.tasks().find((t) => t.id === 1);
    expect(after?.title).toBe(original!.title);
    expect(service.editError()).toBe('Title must be at least 3 characters');
    expect(service.editingTaskId()).toBe(1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
