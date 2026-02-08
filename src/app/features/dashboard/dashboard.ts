import { Component, computed, signal } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardPage {
  tasks = signal<Task[]>([
    { id: 1, title: 'Task 1', done: false },
    { id: 2, title: 'Task 2', done: false },
    { id: 3, title: 'Task 3', done: false },
  ]);

  totalCount = computed(() => this.tasks().length);
  openCount = computed(() => this.tasks().filter((task) => !task.done).length);
  doneCount = computed(() => this.tasks().filter((task) => task.done).length);

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
}
