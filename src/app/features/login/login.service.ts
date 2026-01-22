import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { Endpoints } from '../../core/api/Endpoints';
import { getTenantName } from '../../shared/utils/getTenantName';


@Injectable({ providedIn: 'root' })
export class LoginService {
    private apiUrl = environment.apiUrl;
    private tenantName = getTenantName();

    constructor(private http: HttpClient) {}

    postLogin(credentials: { email: string; password: string }): Observable<any> {
        const payload = { ...credentials, tenantName: this.tenantName };
        return this.http.post<any>(`${this.apiUrl}${Endpoints.login.root}`, payload).pipe(
            tap((response) => {
                if (response.status === 200 && response.data) {
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('user', JSON.stringify(response.data.user));
                }
            })
        );
    }
}