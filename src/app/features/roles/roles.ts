import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';

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
export class RolesComponent {
  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Roles', url: '/roles', active: true }
  ];

  // Datos simulados para la tabla
  roles = [
    { id: 1, name: 'Administrador', description: 'Acceso total al sistema', status: 'Activo' },
    { id: 2, name: 'Usuario', description: 'Acceso limitado a funciones básicas', status: 'Activo' },
    { id: 3, name: 'Invitado', description: 'Solo lectura', status: 'Inactivo' }
  ];

  columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'status', label: 'Estado' }
  ];

  actions = [
    { name: 'edit', label: 'Editar', icon: 'edit' },
    { name: 'delete', label: 'Eliminar', icon: 'trash' }
  ];

  loading = false;
  showRoleModal = false;

  // Configuración del formulario dinámico
  roleFormConfig = [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre del Rol',
      placeholder: 'Ej: Administrador',
      required: true
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Descripción',
      placeholder: 'Descripción breve del rol',
      required: true
    },
    {
      type: 'select',
      name: 'status',
      label: 'Estado',
      options: [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
      ],
      required: true
    }
  ];

  openModal() { this.showRoleModal = true; }
  closeModal() { this.showRoleModal = false; }

  onTableAction(event: any) {
    console.log('Acción de tabla:', event);
  }

  onFormSubmit(formData: any) {
    console.log('Formulario enviado:', formData);
    this.closeModal();
  }
}
