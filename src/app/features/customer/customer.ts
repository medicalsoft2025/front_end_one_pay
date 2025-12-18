import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb";
import { TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';
import { DynamicTableComponent } from "../../shared/components/dynamic-table/dynamic-table";
import { ModalCustomer } from '../../shared/modals/modal-customer/modal-customer';
import { DynamicFormConfig } from '../../shared/components/dynamic-form/dynamic-form.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [BreadcrumbComponent, DynamicTableComponent, ModalCustomer, CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent {
  showCustomerModal = false;

  breadcrumbItems = [{ label: 'Dashboard', url: '/dashboard' }, { label: 'Clientes' }];

  columns: TableColumn[] = [
    { key: 'documentType', label: 'Tipo de documento', sortable: true, type: 'string' },
    { key: 'email', label: 'email', sortable: true, type: 'string' },
    { key: 'phoneNumber', label: 'Fecha', sortable: true, type: 'number' },
    { key: 'customerType', label: 'Tipo de cliente', sortable: true, type: 'string' },
  ];

  data = [
    { id: 1, nombre: 'Pago de factura', fecha: '2025-01-10', monto: 35000 },
    { id: 2, nombre: 'Compra supermercado', fecha: '2025-01-12', monto: 150000 },
    { id: 3, nombre: 'Transferencia', fecha: '2025-01-14', monto: 87000 },
  ];

  actions = [
    { id: 'view', label: 'Ver', icon: 'eye' },
    { id: 'edit', label: 'Editar', icon: 'edit' },
    { id: 'delete', label: 'Eliminar', icon: 'trash', confirm: true },
  ];

  onTableAction(evt: any) {
    console.log('ACTION:', evt);
  }

  customerFormConfig: DynamicFormConfig = {
    submitButtonLabel: 'Guardar cambios',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
        value: '1992-07-15',
        readonly: false,
      },
      {
        type: 'text',
        name: 'firstName',
        label: 'Nombre',
        placeholder: 'Nombre',
        value: 'Carlos',
        readonly: false,
      },
      {
        type: 'text',
        name: 'lastName',
        label: 'Apellido',
        placeholder: 'Apellido',
        value: 'Ramirez',
        readonly: false,
      },
      {
        type: 'text',
        name: 'documentType',
        label: 'Tipo de documento',
        value: 'CC',
        readonly: true,
      },
      {
        type: 'text',
        name: 'documentNumber',
        label: 'Número de documento',
        placeholder: 'Número de documento',
        value: '1020304050',
        readonly: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        placeholder: 'correo@ejemplo.com',
        value: 'cliente.prueba@example.com',
        readonly: false,
      },
      {
        type: 'text',
        name: 'phoneNumber',
        label: 'Teléfono',
        placeholder: '+57...',
        value: '+573112223344',
        readonly: false,
      },
      {
        type: 'text',
        name: 'nationality',
        label: 'Nacionalidad',
        value: 'CO',
        readonly: true,
      },
      {
        type: 'select',
        name: 'customerType',
        label: 'Tipo de cliente',
        value: 'CLIENT',
        readonly: false,
        options: [
          { label: 'Cliente', value: 'CLIENT' },
          { label: 'Empleado', value: 'EMPLOYEED' },
        ],
      },
      {
        type: 'checkbox',
        name: 'enableNotifications',
        label: 'Habilitar notificaciones',
        value: false,
        readonly: false,
      },
    ],
  };
  openNewCustomerModal() {
    this.showCustomerModal = true;
  }

  closeCustomerModal() {
    this.showCustomerModal = false;
  }

  onCustomerSubmit(data: any) {
    console.log('NEW CUSTOMER:', data);
    this.closeCustomerModal();
  }
}
