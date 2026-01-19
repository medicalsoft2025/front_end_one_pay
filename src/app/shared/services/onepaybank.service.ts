
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { OnePayEndpoints } from '../../core/api/onepay.endpoint';
import { PagedResponse } from '../../core/models/apiResponse';
import { BankModel } from '../../core/models/BankModel';

@Injectable({ providedIn: 'root' })
export class OnePayBankService {

    private apiUrl = OnePayEndpoints.bank.root;
 
   constructor(private http: HttpClient) {}
 
   getPayments(): Observable<BankModel[]> {
     return this.http.get<PagedResponse<BankModel>>(`${this.apiUrl}`).pipe(
       map((res) => res.content ?? [])
     );
   }
}