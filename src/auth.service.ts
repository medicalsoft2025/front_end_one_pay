import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private router = inject(Router);
  private http = inject(HttpClient);

  postLogin(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string; user: any }>('/api/login', credentials).pipe(
      map(response => {
        if (!response.user.active) {
          throw new Error('Usuario inactivo');
        }
        return response;
      }),
      tap(response => {
        // Guardar token y usuario en sessionStorage
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
