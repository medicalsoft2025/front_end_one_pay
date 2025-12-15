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

  // Pestaña activa
  activeTabKey = this.tabs[0].key;

  // Cambiar pestaña
  setActiveTab(tabKey: string) {
    this.activeTabKey = tabKey;
  }

  // Obtener componente activo
  get activeComponent() {
    const tab = this.tabs.find((t) => t.key === this.activeTabKey);
    return tab?.component;
  }
}
