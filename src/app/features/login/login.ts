import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ModalService } from '../../shared/components/modals/modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  credentials = {
    username: '',
    password: ''
  };
  isLoading = false;
  showPassword = false;
  
  images: string[] = [
    '/assets/images/medical-icon.svg',
    '/assets/images/MedicalSoft_Login_Default.jpg',
  ];
  currentImageIndex = 0;
  private intervalId: any;
  particles: any[] = [];
  mouseParticles: { x: number, y: number, id: number }[] = [];

  constructor(
    private router: Router, 
    private loginService: LoginService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.startCarousel();
    this.initParticles();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.stopCarousel();
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000);
  }

  initParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 5,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      });
    }
  }

  onMouseMove(e: MouseEvent) {
    const id = Date.now() + Math.random();
    this.mouseParticles.push({
      x: e.clientX,
      y: e.clientY,
      id: id
    });

    setTimeout(() => {
      this.mouseParticles = this.mouseParticles.filter(p => p.id !== id);
    }, 300);
  }

  stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onLogin() {
    if (this.credentials.username && this.credentials.password) {
      this.isLoading = true;

      this.loginService.postLogin({
        email: this.credentials.username,
        password: this.credentials.password
      }).subscribe({
        next: () => {
          this.isLoading = false;
          this.modalService.success('Éxito', 'Bienvenido a MedicalPay').then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error en login:', error);
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
