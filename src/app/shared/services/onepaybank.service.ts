import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap, catchError } from 'rxjs';
import { OnePayEndpoints } from '../../core/api/onepay.endpoint';

import { BankModel } from '../../core/models/bnankModel';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnePayBankService {

  private apiUrl = OnePayEndpoints.bank.root;
  private token = 'sk_test_mPfpVxOu0CbL4nc6FTOMrBv62fUle4Ve';

  constructor(private http: HttpClient) {}

getBanks(): Observable<BankModel[]> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  return this.http.get<BankModel[]>(this.apiUrl, { headers }).pipe(
    map(res => res ?? []),
    catchError(err => {
      console.error('[OnePayBankService] Error al cargar bancos:', err);
      return throwError(() => err);
    })
  );
}

}
