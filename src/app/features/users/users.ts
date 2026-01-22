import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';
import { ToastService } from '../../shared/components/toast/toast.service';

import { UsersService } from './users.service';
import { USER_TABLE_COLUMNS, USER_TABLE_ACTIONS } from './user.table.config';
import { buildUsersFormConfig } from './user.form.config';

import { UserModel } from '../../core/models/userModel';
import { CustomerModel } from '../../core/models/customerModel';
import { TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';
import { FormSubmitEvent } from '../../shared/components/dynamic-form/dynamic-form.types';
import { RoleModel, RolesService } from '../roles/roles.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    DynamicTableComponent,
    DynamicFormComponent,
    ModalComponent,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {

  /* =======================
   * UI CONFIG
   * ======================= */
  breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Usuarios' },
  ];

    /* =======================
   * LIFECYCLE
   * ======================= */
  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  showUserModal = false;
  loading = false;

  columns = USER_TABLE_COLUMNS;
  actions = USER_TABLE_ACTIONS;
  userFormConfig = buildUsersFormConfig();

  /* =======================
   * DATA
   * ======================= */
  users: UserModel[] = [];
  roles: RoleModel[] = [];
  data: CustomerModel[] = [];

  /* =======================
   * CONSTRUCTOR
   * ======================= */
  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private roleService: RolesService
  ) {}



  /* =======================
   * API
   * ======================= */
  loadUsers(): void {
    this.loading = true;

    this.usersService.getUsersByTenant().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando usuarios', error);
        this.loading = false;
        this.toastService.show('Error cargando usuarios', 'error');
      },
    });
  }

    loadRoles(): void {
    this.loading = true;

    this.roleService.getRolesByTenant().subscribe((roles) => {
      this.roles = roles;
      this.loading = false;
    });
  }

  /* =======================
   * TABLE ACTIONS
   * ======================= */
  onTableAction(event: TableEvent): void {
    switch (event.action) {
      case 'delete':
        this.usersService.deleteUser(event.data.id)
          .subscribe(() => this.loadUsers());
        break;

      case 'edit':
        console.log('Editar usuario', event.data);
        break;
    }
  }

  /* =======================
   * FORM ACTIONS
   * ======================= */
  onFormSubmit(event: FormSubmitEvent): void {
    console.log('Form submit clicked', event);
  }

  /* =======================
   * MODAL
   * ======================= */
  openModal(): void {
    this.userFormConfig = buildUsersFormConfig(this.users[0], this.roles);
    this.showUserModal = true;
  }

  closeModal(): void {
    this.showUserModal = false;
  }
}
