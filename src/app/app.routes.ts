import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { ConfigComponent } from './features/config/config';
import { CustomerComponent } from './features/customer/customer';
import { PaymentsComponent } from './features/payments/payments';
import { AccountsComponent } from './features/accounts/accounts';
import { LoginComponent } from './features/login/login';
import { UsersComponent } from './features/users/users';
import { RolesComponent } from './features/roles/roles';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { showNavbar: false }
  },
  {
    path: 'dashboard',
    component: Dashboard,    
  },
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path: 'gestion',
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
  },
   {
    path: 'roles',
    component: RolesComponent,
  }
];
