import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { PagedResponse } from '../../../core/models/apiResponse';
import { environment } from '../../../../environment/environment.local';
import { Endpoints } from '../../../core/api/Endpoints';
import { TransactionModel } from '../../../core/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionModel[]> {  
    return this.http.get<PagedResponse<TransactionModel>>(`${this.apiUrl}${Endpoints.transactions.root}`).pipe(
         map((res) => res.content ?? [])
       );
}
}