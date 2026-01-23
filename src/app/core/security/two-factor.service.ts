import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../features/login/login.service';
import { TwoFactorSetupResponse } from '../models/twoFactorSetupResponse';

@Injectable({
  providedIn: 'root',
})
export class TwoFactorService {

  constructor(private loginService: LoginService) {}

  /**
   * Inicia el setup de 2FA
   * Retorna el QR (otpauth://)
   */
  startSetup(userId: string): Observable<TwoFactorSetupResponse> {
    return this.loginService.twofaSetup(userId);
  }

  /**
   * Confirma el código de 6 dígitos
   */
  confirmSetup(payload: { userId: string, secretKey: string, code: number }): Observable<void> {
    return this.loginService.twofaVerify(payload.userId, payload.secretKey, payload.code);
  }

  /**
   * Desactiva 2FA
   */
  // disable(userId: string): Observable<void> {
  //   return this.loginService.twofaDisable(userId);
  // }
}
