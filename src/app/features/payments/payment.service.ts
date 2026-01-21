import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { PagedResponse } from '../../core/models/apiResponse';
import { PaymentModel } from '../../core/models/paymentModel';
import { Endpoints } from '../../core/api/Endpoints';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = environment.apiUrl; 
  constructor(private http: HttpClient) {}

  getPayments(): Observable<PaymentModel[]> {
    return this.http.get<PagedResponse<PaymentModel>>(`${this.apiUrl}${Endpoints.payments.root}`).pipe(
      map((res) => res.content ?? [])
    );
  }
}
