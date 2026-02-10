import { Routes } from '@angular/router';
import { HomePage } from './features/home/home';
import { DashboardSignalForm } from './features/dashboard-signal-form/dashboard-signal-form';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardSignalForm },
  { path: '**', redirectTo: '' },
];
