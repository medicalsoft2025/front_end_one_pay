import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import { PagedResponse } from '../../core/models/apiResponse';
import { Endpoints } from '../../core/api/Endpoints';
import { CustomerModel } from '../../core/models/customerModel';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<PagedResponse<CustomerModel>>(`${this.apiUrl}${Endpoints.customers.root}`).pipe(
      map((res) => res.content ?? [])
    );
  }

  createCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(`${this.apiUrl}${Endpoints.customers.root}`, customer).pipe(
    );
  }

  getCustomerById(id: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.apiUrl}${Endpoints.customers.byId(id)}`).pipe(
    );
  }

  updateCustomer(id: string, customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(`${this.apiUrl}${Endpoints.customers.byId(id)}`, customer).pipe(
    );
  }
}