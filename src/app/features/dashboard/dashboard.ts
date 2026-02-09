import { Component, computed, signal } from '@angular/core';
import { Filter, Task } from '../../core/models/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardPage {
  tasks = signal<Task[]>([
    { id: 1, title: 'Task 1', done: false, description: '' },
    { id: 2, title: 'Task 2', done: false, description: '' },
    { id: 3, title: 'Task 3', done: false, description: '' },
  ]);
  filter = signal<Filter>('all');
  totalCount = computed(() => this.tasks().length);
  openCount = computed(() => this.tasks().filter((task) => !task.done).length);
  doneCount = computed(() => this.tasks().filter((task) => task.done).length);
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

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    if (this.form.invalid) return;
    const { title, description } = this.form.getRawValue();
    this.tasks.update((tasks) => [
      ...tasks,
      {
        ...this.form.value,
        id: Math.max(...this.tasks().map((t) => t.id), 0) + 1,
        title,
        description,
        done: false,
      },
    ]);
    this.form.reset({ title: '', description: '' });
  }

  get titleCtrl() {
    return this.form.controls.title;
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
