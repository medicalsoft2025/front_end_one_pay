import { DynamicFormConfig, FormFieldOption } from '../../shared/components/dynamic-form/dynamic-form.types';
import { AccountModel } from '../../core/models/AccountModel';
import { BankModel } from '../../core/models/BankModel';

export function buildAccountFormConfig(
  data?: Partial<AccountModel>,
  banks: BankModel[] = []
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
        name: 'bankId',
        label: 'Banco',
        value: data?.bankId ?? '',
        readonly: false,
        options: banks.map(bank => ({
          label: bank.name,
          value: bank.id,
          logo: bank.logo // aquí incluimos el logo
        })),
      },
      {
        type: 'text',
        name: 'accountType',
        label: 'Tipo de cuenta',
        value: data?.accountType ?? '',
        readonly: false,
        options: [
          { label: 'Ahorros', value: 'SAVINGS', logo: null },
          { label: 'Corriente', value: 'CHECKING', logo: null },
          { label: 'Crédito', value: 'CREDIT', logo: null },
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
      }
    ]
  };
}
