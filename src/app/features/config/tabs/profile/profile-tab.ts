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
        name: 'firstName',
        label: 'Nombre',
        placeholder: 'Ingresa tu nombre',
        required: true,
        minLength: 3,
      },
      {
        type: 'text',
        name: 'lastName',
        label: 'Apellido',
        placeholder: 'Ingresa tu apellido',
        required: true,
        minLength: 3,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        placeholder: 'correo@ejemplo.com',
        required: true,
      },
      {
        type: 'tel',
        name: 'phone',
        label: 'Teléfono',
        placeholder: '3001234567',
        pattern: '^[0-9]{10}$',
        errorMessage: 'El teléfono debe tener 10 dígitos',
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Género',
        required: true,
        options: [
          { label: 'Masculino', value: 'M' },
          { label: 'Femenino', value: 'F' },
          { label: 'Otro', value: 'O' },
        ],
      },
      {
        type: 'checkbox',
        name: 'newsletter',
        label: 'Deseo recibir notificaciones',
        value: true,
      },
      {
        type: 'textarea',
        name: 'bio',
        label: 'Biografía',
        placeholder: 'Cuéntanos sobre ti',
        maxLength: 300,
      },
    ],
  };

  onProfileSubmit(event: any): void {
    if (event.isValid) {
      console.log('✅ Formulario válido', event.formValue);
      // Aquí llamas tu servicio API
    } else {
      console.log('❌ Formulario inválido', event.errors);
    }
  }

  onProfileCancel(): void {
    console.log('Formulario cancelado');
  }
}
