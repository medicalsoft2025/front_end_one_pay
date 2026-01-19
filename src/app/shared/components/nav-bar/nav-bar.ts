import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHome, heroCog6Tooth } from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
import { TenantModel } from '../../../core/models/TenantModel';
import { TenantService } from '../../../features/dashboard/tenant.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ heroHome, heroCog6Tooth }),
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {

   constructor(private tenantService: TenantService) { }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  tenant$!: Observable<TenantModel>;


}
