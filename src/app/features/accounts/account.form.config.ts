import { DynamicFormConfig } from '../../shared/components/dynamic-form/dynamic-form.types';
import { AccountModel } from '../../core/models/AccountModel';

export function buildAccountFormConfig(
  data?: Partial<AccountModel>
): DynamicFormConfig {
  return {
    submitButtonLabel: 'Guardar cambios',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'text',
        name: 'accountNumber',
        label: 'Número de cuenta',
        value: data?.accountNumber ?? '',
        readonly: false,
      },
      {
        type: 'select',
        name: 'accountType',
        label: 'Tipo de cuenta',
        value: data?.accountType ?? '',
        readonly: false,
        options: [
          { label: 'Ahorros', value: 'SAVINGS' },
          { label: 'Corriente', value: 'CHECKING' },
          { label: 'Crédito', value: 'CREDIT' },
        ],
      },
      {
        type: 'text',
        name: 'reEnrrollment',
        label: 'Reinscripción',
        value: data?.reEnrrollment ?? '',
        readonly: false,
      },
      {
        type: 'text',
        name: 'customerId',
        label: 'Cliente',
        value: data?.customerId ?? '',
        readonly: false,
      },
      {
        type: 'text',
        name: 'bankId',
        label: 'Banco',
        value: data?.bankId ?? '',
        readonly: false,
      },
    ],
  };
}
