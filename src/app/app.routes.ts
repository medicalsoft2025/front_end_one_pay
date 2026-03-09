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
import { redirectGuard } from './core/interceptors/redirect.guard';
import { RedirectComponent } from './core/common/redirect-component/redirect-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'medicalsoft',
    component: RedirectComponent,
    canActivate: [redirectGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { showNavbar: false }
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'config',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ConfigComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      }
    ]
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
  }
];
