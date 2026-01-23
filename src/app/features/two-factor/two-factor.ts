import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastService } from '../../shared/components/toast/toast.service';
import { TwoFactorService } from '../../core/security/two-factor.service';
import { TwoFactorSetupResponse } from '../../core/models/twoFactorSetupResponse';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './two-factor.html',
  styleUrls: ['./two-factor.scss'],
})
export class TwoFactorComponent implements OnInit {

  @Input() userId!: string; // ID del usuario a configurar 2FA

  qrCodeUrl: string = '';   // otpauth://...
  secret: string = '';
  code: string = '';        // código de 6 dígitos ingresado por el usuario
  loading: boolean = false;

  step: 'QR' | 'VERIFY' | 'DONE' = 'QR';

  constructor(
    private twoFactorService: TwoFactorService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      this.toastService.show('Usuario no definido para 2FA', 'error');
      return;
    }
    this.generateQr();
  }

  /** Getter que codifica la URL para el QR */
  get encodedQrCodeUrl(): string {
    return encodeURIComponent(this.qrCodeUrl);
  }

  generateQr(): void {
    this.loading = true;
    this.cdr.detectChanges(); // forzar que Angular vea el cambio

    this.twoFactorService.startSetup(this.userId).subscribe({
      next: (res: TwoFactorSetupResponse) => {
        this.qrCodeUrl = res.qrCodeUrl; // otpauth://...
        this.secret = res.secretKey;
        this.step = 'VERIFY';
        this.loading = false;
        this.cdr.detectChanges(); // actualizar la vista
      },
      error: () => {
        this.toastService.show('Error generando QR de 2FA', 'error');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
verifyCode(): void {
  if (!this.code || this.code.length !== 6) {
    this.toastService.show('Ingresa un código de 6 dígitos', 'error');
    return;
  }

  this.loading = true;
  this.cdr.detectChanges();
  

  this.loginService.twofaVerify(
    this.userId,
    this.secret,           // secretKey que recibiste en startSetup
    Number(this.code)      // convertir a número
  ).subscribe({
    next: () => {
      this.toastService.show('2FA activado correctamente', 'success');
      this.step = 'DONE';
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.toastService.show('Código incorrecto, intenta de nuevo', 'error');
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}



}
