import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormConfig, FormField, FormSubmitEvent, FormFieldType } from './dynamic-form.types';
import { SelectSearchComponent } from '../select-search/select-search';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash, heroInformationCircle } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectSearchComponent, NgIconsModule],
  providers: [provideIcons({ heroEye, heroEyeSlash, heroInformationCircle })],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() config!: DynamicFormConfig;
  @Output() onSubmit = new EventEmitter<FormSubmitEvent>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;
  submitted = false;
  passwordVisibility: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reconstruye el formulario si la configuración cambia después de la inicialización.
    if (changes['config'] && !changes['config'].firstChange) {
      this.buildForm();
    }
  }

  buildForm(): void {
    const groupConfig: { [key: string]: any } = {};

    this.config.fields.forEach((field) => {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      if (field.min !== undefined) validators.push(Validators.min(field.min));
      if (field.max !== undefined) validators.push(Validators.max(field.max));
      if (field.type === 'email') validators.push(Validators.email);
      if (field.type === 'url') validators.push(Validators.pattern(/^https?:\/\/.+/));
      if (field.pattern) validators.push(Validators.pattern(field.pattern));

      groupConfig[field.name] = [
        {
          value: field.value ?? (field.type === 'switch' || field.type === 'checkbox' ? false : ''),
          disabled: field.disabled || field.readonly
        },
        validators,
      ];
    });

    this.form = this.fb.group(groupConfig);
  }

  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !this.submitted) return '';

    const field = this.config.fields.find((f) => f.name === fieldName);

    if (control.hasError('required')) return `${field?.label} es requerido`;
    if (control.hasError('minlength')) return `${field?.label} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.hasError('maxlength')) return `${field?.label} no puede exceder ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.hasError('email')) return `${field?.label} debe ser un email válido`;
    if (control.hasError('min')) return `${field?.label} debe ser mayor a ${control.errors['min'].min}`;
    if (control.hasError('max')) return `${field?.label} debe ser menor a ${control.errors['max'].max}`;
    if (control.hasError('pattern')) return field?.errorMessage || `${field?.label} no tiene un formato válido`;

    return '';
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.onSubmit.emit({ formValue: this.form.getRawValue(), isValid: true });
    } else {
      const errors: { [key: string]: string } = {};
      Object.keys(this.form.controls).forEach((key) => {
        const error = this.getFieldError(key);
        if (error) errors[key] = error;
      });

      this.onSubmit.emit({
        formValue: this.form.getRawValue(),
        isValid: false,
        errors,
      });
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
    this.submitted = false;
  }

  getFieldType(type: FormFieldType): string {
    const typeMap: { [key in FormFieldType]: string } = {
      text: 'text',
      email: 'email',
      password: 'password',
      number: 'number',
      date: 'date',
      tel: 'tel',
      url: 'url',
      select: 'select',
      checkbox: 'checkbox',
      switch: 'checkbox',
      textarea: 'textarea',
      hidden: 'hidden',
       'select-search': 'text'
    };
    return typeMap[type];
  }

  togglePasswordVisibility(fieldName: string): void {
    this.passwordVisibility[fieldName] = !this.passwordVisibility[fieldName];
  }

  isPasswordVisible(fieldName: string): boolean {
    return !!this.passwordVisibility[fieldName];
  }

  getPasswordStrength(password: any): { width: number; label: string; color: string } {
    const pass = password ? String(password) : '';
    if (!pass) return { width: 0, label: '', color: 'transparent' };

    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score > 4) score = 4;

    const levels = [
      { label: 'Muy débil', color: '#ef4444' }, // Rojo
      { label: 'Débil', color: '#ef4444' },     // Rojo
      { label: 'Regular', color: '#f59e0b' },   // Naranja
      { label: 'Buena', color: '#3b82f6' },     // Azul
      { label: 'Fuerte', color: '#10b981' },    // Verde
    ];

    return { width: (score + 1) * 20, ...levels[score] };
  }

  getPasswordRequirements(password: any): { label: string; met: boolean }[] {
    const pass = password ? String(password) : '';
    return [
      { label: 'Mínimo 7 caracteres', met: pass.length >= 7 },
      { label: 'Una mayúscula', met: /[A-Z]/.test(pass) },
      { label: 'Un carácter especial', met: /[\W_]/.test(pass) }
    ];
  }
}
