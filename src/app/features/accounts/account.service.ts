import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { PagedResponse } from '../../core/models/apiResponse';
import { Endpoints } from '../../core/api/Endpoints';
import { AccountModel } from '../../core/models/AccountModel';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<AccountModel[]> {
    return this.http.get<PagedResponse<AccountModel>>(`${this.apiUrl}${Endpoints.accounts.root}`).pipe(
      map((res) => res.content ?? [])
    );
  }

  createAccount(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(`${this.apiUrl}${Endpoints.accounts.root}`, account).pipe(
    );
  }

  updateAccount(id: string, account: AccountModel): Observable<AccountModel> {
    return this.http.put<AccountModel>(`${this.apiUrl}${Endpoints.accounts.byId(id)}`, account).pipe(
    );
  }
}
