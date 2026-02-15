import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStore } from './data-access/task-store';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardPage {
  taskStore = inject(TaskStore);

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  get titleCtrl() {
    return this.form.controls.title;
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { title, description } = this.form.getRawValue();
    this.taskStore.addTask(title, description);
    this.form.reset({ title: '', description: '' });
  }

  startEdit(task: Task) {
    this.taskStore.startEdit(task);

    setTimeout(() => {
      const selector = `input[data-edit-title-id="${task.id}"]`;
      const el = document.querySelector<HTMLInputElement>(selector);
      el?.focus();
      el?.select();
    }, 0);
  }
}
