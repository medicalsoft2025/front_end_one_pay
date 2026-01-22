import { DynamicFormConfig } from '../../shared/components/dynamic-form/dynamic-form.types';

export function buildUsersFormConfig(data?: any): DynamicFormConfig {
export function buildUsersFormConfig(data?: any, roles: any[] = []): DynamicFormConfig {
  return {
    submitButtonLabel: 'Guardar cambios',
    submitButtonLabel: data ? 'Guardar cambios' : 'Crear usuario',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        key: 'fullName',
        label: 'Nombre completo',
        type: 'text',
        value: data?.fullName || '',
        validators: { required: true },
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        value: data?.email || '',
        validators: { required: true, email: true },
      },
      {
        key: 'password',
        label: 'Contraseña',
        type: 'password',
        value: '',
        validators: data ? {} : { required: true },
      },
      {
        key: 'roleId',
        label: 'Rol',
        type: 'select',
        value: data?.roleId || '',
        options: roles,
        validators: { required: true },
      },
    ],
  };
}
