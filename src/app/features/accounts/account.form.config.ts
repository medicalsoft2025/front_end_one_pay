import { DynamicFormConfig, FormFieldOption } from '../../shared/components/dynamic-form/dynamic-form.types';
import { AccountModel } from '../../core/models/accountModel';
import { BankModel } from '../../core/models/bankModel';
import { CustomerModel } from '../../core/models/customerModel';

export function buildAccountFormConfig(

  dataBanks?: Partial<AccountModel>,
  banks: BankModel[] = [],
  customers: CustomerModel[] = []
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
        value: dataBanks?.accountNumber ?? '',
        readonly: false,
      },
      {
        type: 'select',
        name: 'bankId',
        label: 'Banco',
        value: dataBanks?.bankId ?? '',
        readonly: false,
        options: banks.map(bank => ({
          label: bank.name,
          value: bank.id,
          logo: bank.logo // aquí incluimos el logo
        })),
      },
      {
        type: 'select',
        name: 'accountType',
        label: 'Tipo de cuenta',
        value: dataBanks?.accountType ?? '',
        readonly: false,
        options: [
          { label: 'Ahorros', value: 'SAVINGS', logo: null },
          { label: 'Corriente', value: 'CHECKING', logo: null },
          { label: 'Crédito', value: 'CREDIT', logo: null },
        ],
      },
       {
        type: 'select',
        name: 'customerId',
        label: 'Cliente',
        value: dataBanks?.customerId ?? '',
        readonly: false,
        options: customers.map(customer => ({
          label: customer.firstName + ' ' + customer.lastName + ' - ' + customer.documentNumber,
          value: customer.onePayId,
          logo: null
        })),
      },
      {
        type: 'checkbox',
        name: 'reEnrrollment',
        label: 'Reinscripción',
        value: dataBanks?.reEnrrollment ?? false,
        readonly: false,
      },
        {
        type: 'checkbox',
        name: 'authorization',
        label: 'Autoriza debitos automaticos',
        value: dataBanks?.authorization ?? false,
        readonly: false,
      }
     
    ]
  };
}
