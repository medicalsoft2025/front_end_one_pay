import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './account.service';
import { ACCOUNT_TABLE_CONFIG, ACCOUNT_TABLE_ACTIONS } from './account.table.config';
import { AccountModel } from '../../core/models/AccountModel';
import { TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb";
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { DynamicFormComponent } from "../../shared/components/dynamic-form/dynamic-form";
import { DynamicFormConfig, FormSubmitEvent } from '../../shared/components/dynamic-form/dynamic-form.types';
import { buildAccountFormConfig } from './account.form.config';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';
import { BankModel } from '../../core/models/BankModel';
import { OnePayBankService } from '../../shared/services/onepaybank.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerModel } from '../../core/models/customerModel';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    DynamicTableComponent,
    BreadcrumbComponent,
    DynamicFormComponent,
    ModalComponent
  ],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.scss'],
})
export class AccountsComponent implements OnInit {
  breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Cuentas' }
  ];

  accounts: AccountModel[] = [];
  columns = ACCOUNT_TABLE_CONFIG;
  actions = ACCOUNT_TABLE_ACTIONS;

  showFormModal = false;
  formConfig?: DynamicFormConfig;
  editingAccount?: AccountModel;
  banks: BankModel[] = []; // almacena los bancos
  customers: CustomerModel[] = []; // almacena los clientes

  constructor(
    private accountService: AccountService,
    private bankService: OnePayBankService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.loadBanks();
    this.loadCustomers();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  loadBanks(): void {
    this.bankService.getBanks().subscribe((banks) => {
      this.banks = banks;
    });
  }

  openCreateForm(): void {
    this.editingAccount = undefined;
    this.formConfig = buildAccountFormConfig(undefined, this.banks, this.customers);
    this.showFormModal = true;
  }

  openEditForm(account: AccountModel): void {
    this.editingAccount = account;
    this.formConfig = buildAccountFormConfig(account, this.banks, this.customers);
    this.showFormModal = true;
  }

  closeForm(): void {
    this.showFormModal = false;
    this.formConfig = undefined;
    this.editingAccount = undefined;
  }

onFormSubmit(event: FormSubmitEvent): void {
  if (!event.isValid) {
    console.warn('Formulario inválido', event.errors);
    return;
  }

  const formValue = event.formValue as AccountModel;
  const payload = {
    account_number: formValue.accountNumber,
    subtype: formValue.accountType,
    're-enrollment': formValue.reEnrrollment,
    customer_id: formValue.customerId,
    bank_id: formValue.bankId,
    authorization: formValue.authorization,
  };

  if (this.editingAccount) {
    this.accountService.updateAccount(this.editingAccount.id, payload as any).subscribe(() => {
      this.loadAccounts();
      this.closeForm();
    });
  } else {
    console.log('Creating account with payload:', payload);
    this.accountService.createAccount(payload as any).subscribe(() => {
      this.loadAccounts();
      this.closeForm();
    });
  }
}


  onActionTriggered(event: TableEvent): void {
    const action = event.action;
    const row = event.data as AccountModel;

    switch (action) {
      case 'view':
        console.log('View account:', row);
        break;
      case 'edit':
        this.openEditForm(row);
        break;
      case 'delete':
        console.log('Delete account:', row);
        break;
    }
  }
}
