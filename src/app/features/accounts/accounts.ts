import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { ACCOUNT_TABLE_CONFIG, ACCOUNT_TABLE_ACTIONS } from './account.table.config';
import { AccountModel } from '../../core/models/AccountModel';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';



@Component({
  selector: 'app-accounts',
  imports: [DynamicTableComponent],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.scss'],
})
export class AccountsComponent implements OnInit {
  accounts: AccountModel[] = [];
  columns = ACCOUNT_TABLE_CONFIG;
  actions = ACCOUNT_TABLE_ACTIONS;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  onActionTriggered(event: TableEvent): void {
    const action = event.action;
    const row = event.data as AccountModel;

    switch (action) {
      case 'view':
        this.viewAccount(row);
        break;
      case 'edit':
        this.editAccount(row);
        break;
      case 'delete':
        this.deleteAccount(row);
        break;
    }
  }

  viewAccount(account: AccountModel): void {
    console.log('View account:', account);
  }

  editAccount(account: AccountModel): void {
    console.log('Edit account:', account);
  }

  deleteAccount(account: AccountModel): void {
    console.log('Delete account:', account);
  }
}
