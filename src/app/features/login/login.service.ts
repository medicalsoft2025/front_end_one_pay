import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { Endpoints } from '../../core/api/Endpoints';
import { getTenantName } from '../../shared/utils/getTenantName';
import { use } from 'echarts';


@Injectable({ providedIn: 'root' })
export class LoginService {
    private apiUrl = environment.apiUrl;
    private tenantName = getTenantName();

    constructor(private http: HttpClient) { }

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

    getMe(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}${Endpoints.login.me}`).pipe(
            map((response) => response.data)
        );
    }

    twofaSetup(userId?: string): Observable<any> {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        const headers = { 'X-User-Id': userId || user.id || '' };

        return this.http
            .get<any>(`${this.apiUrl}${Endpoints.login.twofaSetup}`, { headers })
            .pipe(map(res => res.data));
    }

    twofaVerify(userId: string, secretKey: string, code: number,): Observable<any> {
        console.log('Verifying 2FA with', { userId, secretKey, code });
        return this.http.post<any>(
            `${this.apiUrl}${Endpoints.login.twofaVerify}`,
            { code, secretKey, userId },
        ).pipe(
            tap(res => {
                if (res.status === 200 && res.data) {
                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                }
            })
        );
    }
}