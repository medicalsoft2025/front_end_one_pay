import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { ROLES_TABLE_ACTIONS, ROLES_TABLE_COLUMNS } from './roles.table.config';

import { PermissionModel } from '../../core/models/permissionModel';
import { ToastService } from '../../shared/components/toast/toast.service';
import { RoleModel } from '../../core/models/roleModel';
import { RolesService } from './roles.service';
import { buildRolesFormConfig } from './roles.form.config';
import { ModalService } from '../../shared/components/modals/modal.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    DynamicTableComponent,
    ModalComponent,
    DynamicFormComponent
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class RolesComponent implements OnInit {

  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Roles', url: '/roles', active: true }
  ];

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }



  loading = false;
  showRoleModal = false;

  roleFormConfig = buildRolesFormConfig();


  columns = ROLES_TABLE_COLUMNS;
  actions = ROLES_TABLE_ACTIONS;

  roles: RoleModel[] = [];
  permissions: PermissionModel[] = [];
  currentRoleId: string | null = null;

  constructor(
    private roleService: RolesService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getRolesByTenant().subscribe((roles) => {
      this.roles = roles;
      this.loading = false;
    });
  }

  loadPermissions(): void {
    this.roleService.getPermissions().subscribe((permissions) => {
      this.permissions = permissions;
    });
  }




  openModal() {
    this.currentRoleId = null;
    this.roleFormConfig = buildRolesFormConfig(undefined, this.permissions);
    this.showRoleModal = true;
  }
  closeModal() { this.showRoleModal = false; }

  async onTableAction(event: any) {
    if (event.action === 'edit') {
      this.currentRoleId = event.data.id;
      this.roleFormConfig = buildRolesFormConfig(event.data, this.permissions);
      this.showRoleModal = true;
    } else if (event.action === 'delete') {
      const confirmed = await this.modalService.confirm(
        'Eliminar Rol',
        `¿Está seguro de que desea eliminar el rol "${event.data.name}"?`
      );

      if (confirmed) {
        this.loading = true;
        this.roleService.deleteRole(event.data.id).subscribe({
          next: () => {
            this.toastService.show('Rol eliminado con éxito', 'success');
            this.loadRoles();
          },
          error: (err) => {
            this.loading = false;
            this.toastService.show('Error al eliminar el rol', 'error');
            console.error(err);
          }
        });
      }
    }
  }

  onFormSubmit(event: any) {
    if (!event.isValid) return;

    this.loading = true;
    const formValue = event.formValue;

    const role: any = {
      name: formValue.name,
      description: formValue.description,
      permissions: []
    };

    // Mapear los permisos seleccionados (switches)
    this.permissions.forEach((p) => {
      if (formValue[`permission_${p.id}`]) {
        role.permissions.push(p.id);
      }
    });

    if (this.currentRoleId) {
      this.roleService.updateRole(this.currentRoleId, role).subscribe({
        next: () => {
          this.toastService.show('Rol actualizado con éxito', 'success');
          this.closeModal();
          this.loadRoles();
        },
        error: (err) => {
          this.loading = false;
          this.toastService.show('Error al actualizar el rol', 'error');
          console.error(err);
        },
      });
    } else {
      this.roleService.createRole(role).subscribe({
        next: () => {
          this.toastService.show('Rol creado con éxito', 'success');
          this.closeModal();
          this.loadRoles();
        },
        error: (err) => {
          this.loading = false;
          this.toastService.show('Error al crear el rol', 'error');
          console.error(err);
        },
      });
    }
  }
}
