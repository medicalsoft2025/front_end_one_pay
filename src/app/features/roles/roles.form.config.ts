import { PermissionModel } from '../../core/models/permissionModel';
import { RoleModel } from '../../core/models/roleModel';
import {
  DynamicFormConfig,
  FormField
} from '../../shared/components/dynamic-form/dynamic-form.types';

export function buildRolesFormConfig(
  data?: Partial<RoleModel>,
  permissions: PermissionModel[] = []
): DynamicFormConfig {

  const permissionFields: FormField[] = permissions.map(permission => ({
    type: 'switch',
    name: `permission_${permission.id}`,
    label: permission.description ?? 'Permiso',
    value: data?.permissions?.some(p => p.id === permission.id) ?? false,
  }));

  return {
    submitButtonLabel: data ? 'Guardar cambios' : 'Crear rol',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre del rol',
        value: data?.name ?? '',
        validators: ['required'],
      },
      {
        type: 'text',
        name: 'description',
        label: 'Descripción',
        value: data?.description ?? '',
        validators: ['required'],
      },
      ...permissionFields,
    ],
  };
}
