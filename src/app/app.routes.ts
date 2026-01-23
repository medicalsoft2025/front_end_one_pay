import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { ConfigComponent } from './features/config/config';
import { CustomerComponent } from './features/customer/customer';
import { PaymentsComponent } from './features/payments/payments';
import { AccountsComponent } from './features/accounts/accounts';
import { LoginComponent } from './features/login/login';
import { UsersComponent } from './features/users/users';
import { RolesComponent } from './features/roles/roles';
import { authGuard } from './core/interceptors/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { showNavbar: false }
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'config',
    component: ConfigComponent,
    canActivate: [authGuard]
  },
  {
    path: 'gestion',
    canActivate: [authGuard],
    children: [
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
   {
    path: 'roles',
    component: RolesComponent,
    canActivate: [authGuard]
  }
];
