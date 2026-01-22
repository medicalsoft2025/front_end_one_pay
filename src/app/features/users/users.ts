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
import { TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';
import { FormSubmitEvent } from '../../shared/components/dynamic-form/dynamic-form.types';
import { RoleModel } from '../../core/models/roleModel';
import { RolesService } from '../roles/roles.service';
import { ModalService } from '../../shared/components/modals/modal.service';


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
  currentUserId: string | null = null;
  

  /* =======================
   * CONSTRUCTOR
   * ======================= */
  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private roleService: RolesService,
    private modalService: ModalService
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
  async onTableAction(event: TableEvent): Promise<void> {
    switch (event.action) {
      case 'delete':
        const confirmed = await this.modalService.confirm(
          'Eliminar Usuario',
          `¿Está seguro de que desea eliminar este usuario?`
        );

        if (confirmed) {
          this.loading = true;
          this.usersService.deleteUser(event.data.id).subscribe({
            next: () => {
              this.toastService.show('Usuario eliminado con éxito', 'success');
              this.loadUsers();
            },
            error: (error) => {
              console.error('Error eliminando usuario', error);
              this.loading = false;
              this.toastService.show('Error eliminando usuario', 'error');
            }
          });
        }
        break;

      case 'edit':
        this.currentUserId = event.data.id;
        this.userFormConfig = buildUsersFormConfig(event.data, this.roles);
        this.showUserModal = true;
        break;
    }
  }

  /* =======================
   * FORM ACTIONS
   * ======================= */
  onFormSubmit(event: FormSubmitEvent): void {
    if (!event.isValid) return;

    const formValue = event.formValue;

    if (formValue['password'] !== formValue['confirmPassword']) {
      this.toastService.show('Las contraseñas no coinciden', 'error');
      return;
    }

    this.loading = true;

    // Excluir confirmPassword del payload
    const { confirmPassword, ...cleanFormValue } = formValue;

    const fullName = [
      cleanFormValue['firstName'],
      cleanFormValue['secondName'],
      cleanFormValue['firstLastName'],
      cleanFormValue['secondLastName']
    ].filter(Boolean).join(' ');

    const payload = { ...cleanFormValue, fullName };

    if (this.currentUserId) {
      this.usersService.updateUser(this.currentUserId, payload).subscribe({
        next: () => {
          this.toastService.show('Usuario actualizado con éxito', 'success');
          this.closeModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error actualizando usuario', error);
          this.loading = false;
          this.toastService.show('Error actualizando usuario', 'error');
        }
      });
    } else {
      this.usersService.createUser(payload).subscribe({
        next: () => {
          this.toastService.show('Usuario creado con éxito', 'success');
          this.closeModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error creando usuario', error);
          this.loading = false;
          this.toastService.show('Error creando usuario', 'error');
        }
      });
    }
  }

  /* =======================
   * MODAL
   * ======================= */
  openModal(): void {
    this.currentUserId = null;
    this.userFormConfig = buildUsersFormConfig(undefined, this.roles);
    this.showUserModal = true;
  }

  closeModal(): void {
    this.showUserModal = false;
  }
}
