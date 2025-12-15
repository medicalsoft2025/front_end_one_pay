import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form';
import { DynamicFormConfig } from '../../../../shared/components/dynamic-form/dynamic-form.types';


@Component({
  selector: 'app-profile-tab',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileTabComponent {
  profileFormConfig: DynamicFormConfig = {
    submitButtonLabel: 'Guardar cambios',
    cancelButtonLabel: 'Cancelar',
    submitButtonDisabled: false,
    fields: [
      {
        type: 'text',
        name: 'tenant',
        label: 'Tenant',
        placeholder: 'Nombre del tenant',
        value: 'Clinica Test',
        readonly: true,
      },
      {
        type: 'text',
        name: 'bankOnePayId',
        label: 'Bank OnePay ID',
        placeholder: 'ID de Bank OnePay',
        value: 'OP-987654',
        required: true,
      },
      {
        type: 'text',
        name: 'document',
        label: 'Documento',
        placeholder: 'Número de documento',
        value: '123456789',
        required: true,
      },
      {
        type: 'select',
        name: 'documentType',
        label: 'Tipo de Documento',
        value: 'CC',
        required: true,
        options: [
          { label: 'Cédula de ciudadanía', value: 'CC' },
          { label: 'NIT', value: 'NIT' },
          { label: 'Pasaporte', value: 'PP' },
        ],
      },
      {
        type: 'text',
        name: 'fullName',
        label: 'Nombre Completo',
        placeholder: 'Juan Pérez',
        value: 'Juan Pérez',
        required: true,
      },
      {
        type: 'tel',
        name: 'phone',
        label: 'Teléfono',
        placeholder: '3001234567',
        value: '3001234567',
        pattern: '^[0-9]{10}$',
        errorMessage: 'El teléfono debe tener 10 dígitos',
        required: true,
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección',
        placeholder: 'Cra 45 # 23-10',
        value: 'Cra 45 # 23-10',
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo Electrónico',
        placeholder: 'correo@ejemplo.com',
        value: 'juan.perez@example.com',
        required: true,
      },
      {
        type: 'number',
        name: 'currentBalance',
        label: 'Saldo Actual',
        value: 150000.5,
        readonly: true,
      },
      {
        type: 'select',
        name: 'clientType',
        label: 'Tipo de Cliente',
        value: 'NATURAL',
        required: true,
        options: [
          { label: 'Natural', value: 'NATURAL' },
          { label: 'Jurídico', value: 'JURIDICO' },
        ],
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
