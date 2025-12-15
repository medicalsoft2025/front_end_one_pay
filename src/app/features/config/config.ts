import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { Tabs } from "./tabs/tabs";
import { ProfileTabComponent } from "./tabs/profile/profile-tab";


@Component({
  selector: 'app-config',
  imports: [BreadcrumbComponent, Tabs, ProfileTabComponent],
  templateUrl: './config.html',
  styleUrl: './config.scss',
})
export class Config {
  breadcrumbItems = [{ label: 'Dashboard', url: '/dashboard' }, { label: 'Configuración' }];
}
