import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStore } from './data-access/task-store';

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
}
