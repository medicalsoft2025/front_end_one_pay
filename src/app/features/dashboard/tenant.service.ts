import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { getTenantName } from '../../shared/utils/getTenantName';
import { TenantModel } from '../../core/models/TenantModel';
import { Endpoints } from '../../core/api/Endpoints';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private apiUrl = environment.apiUrl;
  private tenantName = getTenantName; 
  constructor(private http: HttpClient) {}

  getTenantInfo(): Observable<TenantModel> {
  return this.http
    .get<{ data: TenantModel }>(
      `${this.apiUrl}${Endpoints.tenants.byName(this.tenantName())}`
    )
    .pipe(
      map(res => res.data), // primero extraes el TenantModel
      tap(tenant => {
        sessionStorage.setItem('tenantId', tenant.id);
        sessionStorage.setItem('tenant', tenant.tenant);
      })
    );
}

}

