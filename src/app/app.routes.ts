import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Config } from './features/config/config';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'config',
    component: Config,
  },
];
