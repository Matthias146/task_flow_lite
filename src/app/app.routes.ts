import { Routes } from '@angular/router';
import { HomePage } from './features/home/home';
import { DashboardPage } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: '**', redirectTo: '' },
];
