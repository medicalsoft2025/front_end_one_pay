import { Component, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { Tabs } from './tabs/tabs';
import { ProfileTabComponent } from './tabs/profile/profile-tab';
import { ConfigTenantTabComponent } from './tabs/config-tenant/config-tenant';
import { CommonModule } from '@angular/common';

interface TabConfig {
  label: string;
  key: string;
  icon: string;
  component: Type<any>;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [BreadcrumbComponent, Tabs, CommonModule],
  templateUrl: './config.html',
  styleUrls: ['./config.scss'],
  styles: [`
    .config-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `]
})
export class ConfigComponent {
  breadcrumbItems = [{ label: 'Dashboard', url: '/dashboard' }, { label: 'Configuración' }];

  // Lista de pestañas dinámicas
  tabs: TabConfig[] = [
    { label: 'Perfil', key: 'profile', icon: 'heroUser', component: ProfileTabComponent },
    {
      label: 'Configuración Tenant',
      key: 'configTenant',
      icon: 'heroShieldCheck',
      component: ConfigTenantTabComponent,
    },
  ];

  activeTabKey = this.tabs[0].key;

  setActiveTab(tabKey: string) {
    this.activeTabKey = tabKey;
  }

  get activeComponent() {
    const tab = this.tabs.find((t) => t.key === this.activeTabKey);
    return tab?.component || null;
  }
}
