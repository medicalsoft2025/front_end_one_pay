import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  getUser() {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}