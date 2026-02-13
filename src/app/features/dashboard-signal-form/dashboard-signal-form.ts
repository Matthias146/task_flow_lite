import { Component, computed, signal } from '@angular/core';
import { Filter, Task } from '../../core/models/task.model';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-signal-form',
  imports: [FormField, FormsModule],
  templateUrl: './dashboard-signal-form.html',
  styleUrl: './dashboard-signal-form.scss',
})
export class DashboardSignalForm {
  tasks = signal<Task[]>([
    { id: 1, title: 'Task 1', done: false, description: '' },
    { id: 2, title: 'Task 2', done: false, description: '' },
    { id: 3, title: 'Task 3', done: false, description: '' },
  ]);
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

  addTaskModel = signal({
    title: '',
    description: '',
  });

  addTaskForm = form(this.addTaskModel, (form) => {
    minLength(form.title, 3, { message: 'Title must be at least 3 characters' });
    required(form.title, { message: 'Title is required' });
  });

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

  saveEdit(taskId: number) {
    const title = this.draftTitle().trim();
    const description = this.draftDescription();
    if (!title) {
      this.editError.set('Title is required');
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

  onSubmit() {
    if (this.addTaskForm.title().invalid()) return;
    const { title, description } = this.addTaskModel();
    this.tasks.update((tasks) => {
      const nextId = Math.max(...tasks.map((t) => t.id), 0) + 1;
      return [...tasks, { id: nextId, title, description, done: false }];
    });
    this.addTaskForm().reset();
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
}
