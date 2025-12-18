import { Component } from '@angular/core';
import { DynamicFormConfig } from '../../../../shared/components/dynamic-form/dynamic-form.types';
import { DynamicFormComponent } from "../../../../shared/components/dynamic-form/dynamic-form";

@Component({
  selector: 'app-config-tenant',
  imports: [DynamicFormComponent],
  templateUrl: './config-tenant.html',
  styleUrl: './config-tenant.scss',
})
export class ConfigTenantTabComponent {
  settingsFormConfig: DynamicFormConfig = {
    submitButtonLabel: 'Guardar cambios',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'text',
        name: 'tenantId',
        label: 'Tenant ID',
        value: '1a734bae-511f-4f9d-acf7-66a047f16773',
        readonly: true,
      },
      {
        type: 'number',
        name: 'maxDailyDisbursement',
        label: 'Límite diario de desembolso',
        placeholder: '5,000,000.75',
        value: 5000000.75,
        required: true,
      },
      {
        type: 'number',
        name: 'maxTransactionAmount',
        label: 'Monto máximo por transacción',
        placeholder: '150,000.50',
        value: 150000.5,
        required: true,
      },
      {
        type: 'number',
        name: 'holdExpirationHours',
        label: 'Horas de retención antes de liberar',
        placeholder: '24',
        value: 24,
        required: true,
      },
      {
        type: 'checkbox',
        name: 'allowDisbursement',
        label: 'Permitir desembolsos',
        value: true,
      },
      {
        type: 'checkbox',
        name: 'allowWithdraw',
        label: 'Permitir retiros',
        value: false,
      },
      {
        type: 'checkbox',
        name: 'allowInternalTransfers',
        label: 'Permitir transferencias internas',
        value: true,
      },
      {
        type: 'checkbox',
        name: 'autoApproveCharges',
        label: 'Aprobar cargos automáticamente',
        value: true,
      },
      {
        type: 'textarea',
        name: 'metadata',
        label: 'Metadatos (JSON)',
        placeholder: '{"key": "value"}',
        value: '{}',
      },
    ],
  };

  onProfileSubmit(event: any): void {
    if (event.isValid) {
      console.log('Formulario válido', event.formValue);
      // Aquí llamas tu servicio API
    } else {
      console.log('Formulario inválido', event.errors);
    }
  }

  onProfileCancel(): void {
    console.log('Formulario cancelado');
  }
}
