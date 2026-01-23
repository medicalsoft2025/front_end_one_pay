import { Component, OnInit, ApplicationRef, ComponentRef, EnvironmentInjector, createComponent, inject } from '@angular/core';
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
import { TwoFactorService } from '../../core/security/two-factor.service';
import { ModalService } from '../../shared/components/modals/modal.service';
import { TwoFactorComponent } from '../two-factor/two-factor';
import { TwoFactorModalComponent } from '../two-factor/two-factor-modal';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    DynamicTableComponent,
    DynamicFormComponent,
    ModalComponent
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {

  breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Usuarios' },
  ];

  showUserModal = false;
  loading = false;

  twoFactorQrUrl: string | null = null;
  twoFactorSecret: string | null = null;

  columns = USER_TABLE_COLUMNS;
  actions = USER_TABLE_ACTIONS;
  userFormConfig = buildUsersFormConfig();

  users: UserModel[] = [];
  roles: RoleModel[] = [];
  currentUserId: string | null = null;

  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private roleService: RolesService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  // =======================
  // API
  // =======================
  loadUsers(): void {
    this.loading = true;
    this.usersService.getUsersByTenant().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.show('Error cargando usuarios', 'error');
      },
    });
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getRolesByTenant().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.show('Error cargando roles', 'error');
      }
    });
  }

  // =======================
  // TABLE ACTIONS
  // =======================
  async onTableAction(event: TableEvent): Promise<void> {
    switch (event.action) {
      case 'delete': {
        const confirmed = await this.modalService.confirm(
          'Eliminar Usuario',
          '¿Está seguro de que desea eliminar este usuario?'
        );

        if (!confirmed) return;

        this.loading = true;
        this.usersService.deleteUser(event.data.id).subscribe({
          next: () => {
            this.toastService.show('Usuario eliminado con éxito', 'success');
            this.loadUsers();
          },
          error: () => {
            this.loading = false;
            this.toastService.show('Error eliminando usuario', 'error');
          }
        });
        break;
      }

      case 'edit':
        this.currentUserId = event.data.id;
        this.userFormConfig = buildUsersFormConfig(event.data, this.roles);
        this.showUserModal = true;
        break;
      case 'toggle-2fa':
      case 'toggle-2fa':
        this.currentUserId = event.data.id;
        this.modalService.openComponent(TwoFactorModalComponent, { userId: this.currentUserId }, 'Vincular con Google Auth');
        break;

        break;

    }

  }

  // =======================
  // FORM ACTIONS
  // =======================
  onFormSubmit(event: FormSubmitEvent): void {
    if (!event.isValid) return;

    const formValue = event.formValue;

    if (formValue['password'] !== formValue['confirmPassword']) {
      this.toastService.show('Las contraseñas no coinciden', 'error');
      return;
    }

    this.loading = true;

    const wants2FA = formValue['twoFactorAuthentication'];

    const { confirmPassword, twoFactorAuthentication, ...cleanFormValue } = formValue;

    const fullName = [
      cleanFormValue['firstName'],
      cleanFormValue['secondName'],
      cleanFormValue['firstLastName'],
      cleanFormValue['secondLastName']
    ].filter(Boolean).join(' ');

    const payload = { ...cleanFormValue, fullName };

    if (this.currentUserId) {
      this.updateUser(payload, wants2FA);
    } else {
      this.createUser(payload, wants2FA);
    }
  }

  private updateUser(payload: any, wants2FA: boolean): void {
    this.usersService.updateUser(this.currentUserId!, payload).subscribe({
      next: () => {
        this.toastService.show('Usuario actualizado con éxito', 'success');
        this.closeModal();
        this.loadUsers();
      },
      error: () => {
        this.loading = false;
        this.toastService.show('Error actualizando usuario', 'error');
      }
    });
  }

  private createUser(payload: any, wants2FA: boolean): void {
    this.usersService.createUser(payload).subscribe({
      next: (newUser) => {
        this.toastService.show('Usuario creado con éxito', 'success');
        this.closeModal();
        this.loadUsers();
      },
      error: () => {
        this.loading = false;
        this.toastService.show('Error creando usuario', 'error');
      }
    });
  }




  // =======================
  // USER MODAL
  // =======================
  openModal(): void {
    this.currentUserId = null;
    this.userFormConfig = buildUsersFormConfig(undefined, this.roles);
    this.showUserModal = true;
  }

  closeModal(): void {
    this.showUserModal = false;
  }
}
