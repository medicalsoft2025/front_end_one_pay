import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';

import { CUSTOMER_TABLE_COLUMNS, CUSTOMER_TABLE_ACTIONS } from './customer.table.config';
import { buildCustomerFormConfig } from './customer.form.config';

import { CustomerService } from './customer.service';
import { ToastService } from '../../shared/components/toast/toast.service';

import { CustomerModel } from '../../core/models/customerModel';
import { FormSubmitEvent } from '../../shared/components/dynamic-form/dynamic-form.types';
import { PhoneFormatPipe } from '../../core/pipes/phone-format.pipe';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    DynamicTableComponent,
    DynamicFormComponent,
    ModalComponent,
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent implements OnInit {

  /* =======================
   * UI CONFIG
   * ======================= */
  breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Clientes' },
  ];

  showCustomerModal = false;

  columns = CUSTOMER_TABLE_COLUMNS;
  actions = CUSTOMER_TABLE_ACTIONS;
  customerFormConfig = buildCustomerFormConfig();

  /* =======================
   * DATA
   * ======================= */
  data: CustomerModel[] = [];

  constructor(
    private customerService: CustomerService,
    private toastService: ToastService
  ) {}

  /* =======================
   * LIFECYCLE
   * ======================= */
  ngOnInit(): void {
    this.loadCustomers();
  }

  /* =======================
   * API
   * ======================= */
  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.data = customers;
    });
  }

  /* =======================
   * TABLE ACTIONS
   * ======================= */
  onTableAction(event: any): void {
    console.log('ACTION:', event);
  }

  /* =======================
   * MODAL
   * ======================= */
  openModal(): void {
    this.customerFormConfig = buildCustomerFormConfig();
    this.showCustomerModal = true;
  }

  closeModal(): void {
    this.showCustomerModal = false;
  }

  /* =======================
   * FORM
   * ======================= */
  onFormSubmit(event: FormSubmitEvent): void {
    if (!event.isValid) return;

    const phonePipe = new PhoneFormatPipe();
    const form = event.formValue as Partial<CustomerModel>;

    const payload: Partial<CustomerModel> = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      birthdate: form.birthdate,
      documentType: form.documentType,
      documentNumber: form.documentNumber,
      nationality: form.nationality ?? 'CO',
      phoneNumber: phonePipe.transform(form.phoneNumber ?? ''),
      customerType: form.customerType,
      enableNotifications: form.enableNotifications ?? false,
    };

    this.customerService.createCustomer(payload as CustomerModel).subscribe({
      next: () => {
        this.toastService.show('¡Cliente creado con éxito!', 'success');
        this.closeModal();
        this.loadCustomers();
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Error creando cliente', 'error');
      },
    });
  }
}
