import { computed, effect, Injectable, signal } from '@angular/core';
import { Filter, Task } from '../../../core/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private readonly STORAGE_KEY = 'task-flow-lite.tasks.v1';
  private readonly DEFAULT_TASKS: Task[] = [
    { id: 1, title: 'Task 1', done: false, description: '' },
    { id: 2, title: 'Task 2', done: false, description: '' },
    { id: 3, title: 'Task 3', done: false, description: '' },
  ];
  tasks = signal<Task[]>(this.cloneDefaultTasks());
  private cloneDefaultTasks(): Task[] {
    return this.DEFAULT_TASKS.map((t) => ({ ...t }));
  }
  filter = signal<Filter>('all');
  totalCount = computed(() => this.tasks().length);
  openCount = computed(() => this.tasks().filter((task) => !task.done).length);
  doneCount = computed(() => this.tasks().filter((task) => task.done).length);
  editingTaskId = signal<number | null>(null);
  draftTitle = signal('');
  draftDescription = signal('');
  editError = signal('');
  filteredTasks = computed(() => {
    switch (this.filter()) {
      case 'open':
        return this.tasks().filter((task) => !task.done);
      case 'done':
        return this.tasks().filter((task) => task.done);
      default:
        return this.tasks();
    }
  });

  constructor() {
    this.loadFromLocalStorage();
    effect(() => {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error);
      }
    });
  }

  resetDemoData() {
    this.tasks.set(this.cloneDefaultTasks());
    this.cancelEdit();
    this.filter.set('all');
  }

  startEdit(task: Task) {
    this.editingTaskId.set(task.id);
    this.draftDescription.set(task.description || '');
    this.draftTitle.set(task.title);
    this.editError.set('');
  }

  cancelEdit() {
    this.editingTaskId.set(null);
    this.draftDescription.set('');
    this.draftTitle.set('');
    this.editError.set('');
  }

  setDraftTitle(value: string) {
    this.draftTitle.set(value);
    this.editError.set('');
  }

  setDraftDescription(value: string) {
    this.draftDescription.set(value);
    this.editError.set('');
  }

  addTask(title: string, description: string) {
    this.tasks.update((tasks) => {
      const nextId = Math.max(...tasks.map((t) => t.id), 0) + 1;
      return [...tasks, { id: nextId, title, description, done: false }];
    });
  }

  saveEdit(taskId: number) {
    const title = this.draftTitle().trim();
    const description = this.draftDescription();

    if (!title) {
      this.editError.set('Title is required');
      return;
    }

    if (title.length < 3) {
      this.editError.set('Title must be at least 3 characters');
      return;
    }

    this.tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title, description };
        }
        return task;
      }),
    );

    this.cancelEdit();
  }

  deleteTask(taskId: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
    if (this.editingTaskId() === taskId) this.cancelEdit();
  }

  toggleTask(taskId: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, done: !task.done };
        }
        return task;
      }),
    );
  }

  setFilter(nextFilter: Filter) {
    this.filter.set(nextFilter);
  }

  private loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return;

      const parsed: unknown = JSON.parse(raw);
      if (!this.isTaskArray(parsed)) return;

      this.tasks.set(parsed);
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
    }
  }
  private isTaskArray(value: unknown): value is Task[] {
    return (
      Array.isArray(value) &&
      value.every(
        (item) =>
          item &&
          typeof item === 'object' &&
          typeof (item as Task).id === 'number' &&
          typeof (item as Task).title === 'string' &&
          typeof (item as Task).done === 'boolean' &&
          (typeof (item as Task).description === 'string' ||
            typeof (item as Task).description === 'undefined'),
      )
    );
  }
}
