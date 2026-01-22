import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { Endpoints } from '../../core/api/Endpoints';
import { ApiResponse } from '../../core/models/apiResponse';
import { getTenantId } from '../../shared/utils/getTenantId';
import { PermissionModel } from '../../core/models/permissionModel';
import { RoleModel } from '../../core/models/roleModel';


@Injectable({
  providedIn: 'root',
})
export class RolesService {

  private apiUrl = environment.apiUrl;
  private tenantId = getTenantId();

  constructor(private http: HttpClient) {}

  getRolesByTenant(): Observable<RoleModel[]> {
    const url = `${this.apiUrl}${Endpoints.roles.byTenant(this.tenantId)}`;
    return this.http.get<ApiResponse<RoleModel[]>>(url).pipe(
      map((response) => response.data),
    );
  }

  getRoleById(id: string): Observable<RoleModel> {
    const url = `${this.apiUrl}${Endpoints.roles.byId(id)}`;
    return this.http.get<ApiResponse<RoleModel>>(url).pipe(
      map((response) => response.data),
    );
  }

  getPermissions(): Observable<PermissionModel[]> {
    const url = `${this.apiUrl}${Endpoints.roles.permissions}`;
    return this.http.get<ApiResponse<PermissionModel[]>>(url).pipe(
      map((response) => response.data),
    );
  }

  createRole(role: Partial<RoleModel>): Observable<RoleModel> {
    const url = `${this.apiUrl}${Endpoints.roles.create}`;
    const body = { ...role, tenantId: this.tenantId };
    return this.http.post<ApiResponse<RoleModel>>(url, body).pipe(
      map((response) => response.data),
    );
  }

  updateRole(id: string, role: Partial<RoleModel>): Observable<RoleModel> {
    const url = `${this.apiUrl}${Endpoints.roles.update(id)}`;
    return this.http.put<ApiResponse<RoleModel>>(url, role).pipe(
      map((response) => response.data),
    );
  }

  deleteRole(id: string): Observable<boolean> {
    const url = `${this.apiUrl}${Endpoints.roles.delete(id)}`;
    return this.http.delete<ApiResponse<boolean>>(url).pipe(
      map((response) => response.data),
    );
  }
}
