import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');
  const userString = sessionStorage.getItem('user');

  if (token && userString) {
    try {
      const user = JSON.parse(userString);

      if (user.active) {
        // Usuario activo → permitir acceso
        return true;
      } else {
        // Usuario inactivo → redirigir al login
        router.navigate(['/login']);
        return false;
      }

    } catch (err) {
      console.error('Error parsing user from sessionStorage', err);
      router.navigate(['/login']);
      return false;
    }
  }

  // No hay token o no hay usuario → redirigir al login
  router.navigate(['/login']);
  return false;
};
