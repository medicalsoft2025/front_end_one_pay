import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';
import { CUSTOMER_TABLE_COLUMNS, CUSTOMER_TABLE_ACTIONS } from './customer.table.config';
import { buildCustomerFormConfig } from './customer.form.config';
import { DynamicFormComponent } from "../../shared/components/dynamic-form/dynamic-form";
import { CustomerService } from './customer.service';
import { CustomerModel } from '../../core/models/customerModel';
import { FormSubmitEvent } from '../../shared/components/dynamic-form/dynamic-form.types';
import { PhoneFormatPipe } from '../../core/pipes/phone-format.pipe';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, DynamicTableComponent, ModalComponent, DynamicFormComponent],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent implements OnInit {
    breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Clientes' }
  ];
  showCustomerModal = false;

  data: CustomerModel[] = [];

  columns = CUSTOMER_TABLE_COLUMNS;

  actions = CUSTOMER_TABLE_ACTIONS;

  customerFormConfig = buildCustomerFormConfig();

  constructor(private customerService: CustomerService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.data = customers;
    });
  }

  onTableAction(evt: any) {
    console.log('ACTION:', evt);
  }

  openModal() {
    this.customerFormConfig = buildCustomerFormConfig(); // NEW
    this.showCustomerModal = true;
  }

  closeModal() {
    this.showCustomerModal = false;
  }

onFormSubmit(event: FormSubmitEvent) {
  const phonePipe = new PhoneFormatPipe();
  if (!event.isValid) return;

  const form = event.formValue as Partial<CustomerModel>;

  const payload: Partial<CustomerModel> = {
    birthdate: form.birthdate,
    documentNumber: form.documentNumber,
    documentType: form.documentType,
    email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    nationality: form.nationality ?? 'CO',
    phoneNumber: phonePipe.transform(form.phoneNumber ?? ''),
    customerType: form.customerType,
    enableNotifications: form.enableNotifications ?? false,
  };

  this.customerService.createCustomer(payload as CustomerModel).subscribe({
    next: () => {
      this.toastService.show('Cliente creado con éxito!', 'success');
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
