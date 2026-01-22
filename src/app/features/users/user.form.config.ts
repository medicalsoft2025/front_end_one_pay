import { RoleModel } from '../../core/models/roleModel';
import { UserModel } from '../../core/models/userModel';
import { DynamicFormConfig } from '../../shared/components/dynamic-form/dynamic-form.types';


export function buildUsersFormConfig(
  data?: Partial<UserModel>,
  roles: RoleModel[] = []
): DynamicFormConfig {

  let firstName = '';
  let secondName = '';
  let firstLastName = '';
  let secondLastName = '';

  // Si estamos editando, intentamos separar fullName
  if (data?.fullName) {
    const parts = data.fullName.trim().split(' ');

    if (parts.length === 1) {
      firstName = parts[0];
    } else if (parts.length === 2) {
      firstName = parts[0];
      firstLastName = parts[1];
    } else if (parts.length === 3) {
      firstName = parts[0];
      firstLastName = parts[1];
      secondLastName = parts[2];
    } else {
      firstName = parts[0];
      secondName = parts[1];
      firstLastName = parts[2];
      secondLastName = parts.slice(3).join(' ');
    }
  }

  return {
    submitButtonLabel: data ? 'Guardar cambios' : 'Crear usuario',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'text',
        name: 'firstName',
        label: 'Primer nombre',
        value: firstName,
        validators: ['required'],
      },
      {
        type: 'text',
        name: 'secondName',
        label: 'Segundo nombre',
        value: secondName,
      },
      {
        type: 'text',
        name: 'firstLastName',
        label: 'Primer apellido',
        value: firstLastName,
        validators: ['required'],
      },
      {
        type: 'text',
        name: 'secondLastName',
        label: 'Segundo apellido',
        value: secondLastName,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        value: data?.email || '',
        validators: ['required', 'email'],
      },
      {
        type: 'password',
        name: 'password',
        label: 'Contraseña',
        value: '',
        required: !data,
        minLength: 7,
        pattern: '(?=.*[A-Z])(?=.*[\\W_]).*',
        errorMessage: 'Mínimo 7 caracteres, una mayúscula y un carácter especial',
      },
      {
        type: 'select',
        name: 'roleId',
        label: 'Rol',
        value: data?.role?.id || '',
        options: roles.map(role => ({
          label: role.name,
          value: role.id,
          logo: null,
        })),
      },
    ],
  };
}
