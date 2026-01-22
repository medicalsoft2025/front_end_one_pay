import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { Endpoints } from '../../core/api/Endpoints';
import { ApiResponse } from '../../core/models/apiResponse';
import { getTenantId } from '../../shared/utils/getTenantId';
import { getTenantName } from '../../shared/utils/getTenantName';
import { UserModel } from '../../core/models/userModel';


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private apiUrl = environment.apiUrl;
  private tenantId = getTenantId();

  constructor(private http: HttpClient) {}

  getUsersByTenant(): Observable<UserModel[]> {
    const url = `${this.apiUrl}${Endpoints.users.byTenant(this.tenantId)}`;
    return this.http.get<ApiResponse<UserModel[]>>(url).pipe(
      map((response) => response.data),
    );
  }
  
  createUser(user: Partial<UserModel>): Observable<UserModel> {
    const url = `${this.apiUrl}${Endpoints.users.create}`;
    return this.http.post<ApiResponse<UserModel>>(url, user).pipe(
      map((response) => response.data),
    );
  }
    updateUser(id: string, user: Partial<UserModel>): Observable<UserModel> {   
    const url = `${this.apiUrl}${Endpoints.users.update(id)}`;
    return this.http.put<ApiResponse<UserModel>>(url, user).pipe(
      map((response) => response.data),
    );
  }
    deleteUser(id: string): Observable<void> {
    const url = `${this.apiUrl}${Endpoints.users.delete(id)}`;
    return this.http.delete<void>(url);
  }
}