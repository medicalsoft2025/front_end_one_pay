import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHomeSolid,
  heroCog6ToothSolid,
  heroUsersSolid,
  heroCurrencyDollarSolid,
  heroBuildingLibrarySolid,
  heroChevronDownSolid,
  heroChevronUpSolid,
  heroBellSolid,
  heroArrowRightOnRectangleSolid,
  heroShieldCheckSolid,
} from '@ng-icons/heroicons/solid';
import { Observable } from 'rxjs';
import { TenantModel } from '../../../core/models/tenantModel';
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
    provideIcons({
      heroHomeSolid,
      heroCog6ToothSolid,
      heroUsersSolid,
      heroCurrencyDollarSolid,
      heroBuildingLibrarySolid,
      heroChevronDownSolid,
      heroChevronUpSolid,
      heroBellSolid,
      heroArrowRightOnRectangleSolid,
      heroShieldCheckSolid,
    }),
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {

  isMenuOpen = false;
  isGestionMenuOpen = false;
  isConfigMenuOpen = false;
  isUserMenuOpen = false;

  userName: string = '';
  userRole: string = '';

  @ViewChild('userMenuDropdown') userMenuDropdown!: ElementRef;
  @ViewChild('gestionMenuDropdown') gestionMenuDropdown!: ElementRef;
  @ViewChild('configMenuDropdown') configMenuDropdown!: ElementRef;

  constructor(
    private tenantService: TenantService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.userName = user.fullName;       
        this.userRole = user.role.name;     
      } catch (err) {
        console.error('Error parsing user from sessionStorage', err);
      }
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isGestionMenuOpen = false;
    this.isConfigMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  toggleGestionMenu(): void {
    if (!this.isGestionMenuOpen) {
      this.isConfigMenuOpen = false;
      this.isUserMenuOpen = false;
    }
    this.isGestionMenuOpen = !this.isGestionMenuOpen;
  }

  toggleConfigMenu(): void {
    if (!this.isConfigMenuOpen) {
      this.isGestionMenuOpen = false;
      this.isUserMenuOpen = false;
    }
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
  }

  tenant$!: Observable<TenantModel>;

  toggleUserMenu(): void {
    if (!this.isUserMenuOpen) {
      this.isGestionMenuOpen = false;
      this.isConfigMenuOpen = false;
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;
    if (
      this.isUserMenuOpen &&
      this.userMenuDropdown &&
      !this.userMenuDropdown.nativeElement.contains(target)
    ) {
      this.isUserMenuOpen = false;
    }

    if (
      this.isGestionMenuOpen &&
      this.gestionMenuDropdown &&
      !this.gestionMenuDropdown.nativeElement.contains(target)
    ) {
      this.isGestionMenuOpen = false;
    }

    if (
      this.isConfigMenuOpen &&
      this.configMenuDropdown &&
      !this.configMenuDropdown.nativeElement.contains(target)
    ) {
      this.isConfigMenuOpen = false;
    }
  }

  logout(): void {
    // Aquí puedes añadir lógica más compleja, como llamar a un servicio de autenticación.
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
