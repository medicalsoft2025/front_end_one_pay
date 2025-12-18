import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';

import { CUSTOMER_TABLE_COLUMNS, CUSTOMER_TABLE_ACTIONS } from './customer.table.config';
import { buildCustomerFormConfig } from './customer.form.config';
import { DynamicFormComponent } from "../../shared/components/dynamic-form/dynamic-form";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, DynamicTableComponent, ModalComponent, DynamicFormComponent],
  templateUrl: './customer.html',
})
export class CustomerComponent {
  breadcrumbItems = [{ label: 'Dashboard', url: '/dashboard' }, { label: 'Clientes' }];
  showCustomerModal = false;

  data = [];

  onTableAction(evt: any) {
    console.log('ACTION:', evt);
  }

  columns = CUSTOMER_TABLE_COLUMNS;
  actions = CUSTOMER_TABLE_ACTIONS;

  customerFormConfig = buildCustomerFormConfig();

  openModal() {
    this.customerFormConfig = buildCustomerFormConfig(); // NEW
    this.showCustomerModal = true;
  }

  closeModal() {
    this.showCustomerModal = false;
  }

  onSubmit(data: any) {
    console.log('DATA:', data);
    this.closeModal();
  }
}
