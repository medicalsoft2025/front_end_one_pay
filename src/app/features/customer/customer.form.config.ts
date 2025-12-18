import { DynamicFormConfig } from '../../shared/components/dynamic-form/dynamic-form.types';

export function buildCustomerFormConfig(data?: any): DynamicFormConfig {
  return {
    submitButtonLabel: 'Guardar cambios',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
        value: data?.birthdate ?? '',
        readonly: false,
      },
      {
        type: 'text',
        name: 'firstName',
        label: 'Nombre',
        value: data?.firstName ?? '',
        readonly: false,
      },
      {
        type: 'text',
        name: 'lastName',
        label: 'Apellido',
        value: data?.lastName ?? '',
        readonly: false,
      },
      {
        type: 'text',
        name: 'documentType',
        label: 'Tipo de documento',
        value: data?.documentType ?? '',
        readonly: true,
      },
      {
        type: 'text',
        name: 'documentNumber',
        label: 'Número de documento',
        value: data?.documentNumber ?? '',
        readonly: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        value: data?.email ?? '',
        readonly: false,
      },
      {
        type: 'text',
        name: 'phoneNumber',
        label: 'Teléfono',
        value: data?.phoneNumber ?? '',
        readonly: false,
      },
      {
        type: 'select',
        name: 'customerType',
        label: 'Tipo de cliente',
        value: data?.customerType ?? 'CLIENT',
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
        value: data?.enableNotifications ?? false,
        readonly: false,
      },
    ],
  };
}
