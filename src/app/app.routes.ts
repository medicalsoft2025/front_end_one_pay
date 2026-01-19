import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { ConfigComponent } from './features/config/config';
import { CustomerComponent } from './features/customer/customer';
import { PaymentsComponent } from './features/payments/payments';
import { AccountsComponent } from './features/accounts/accounts';

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
    component: ConfigComponent,
  },
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
  }
];
