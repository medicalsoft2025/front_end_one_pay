import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  isLoading = false;
  showPassword = false;

  constructor(private router: Router, private loginService: LoginService) {}

  onLogin() {
    if (this.credentials.username && this.credentials.password) {
      this.isLoading = true;
      
      this.loginService.postLogin({ 
        email: this.credentials.username, 
        password: this.credentials.password 
      }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error en login:', error);
          // Aquí podrías mostrar un mensaje de error al usuario (ej. ToastService)
        }
      });
    }
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
