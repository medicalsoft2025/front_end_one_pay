import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormConfig, FormField, FormSubmitEvent, FormFieldType } from './dynamic-form.types';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() config!: DynamicFormConfig;
  @Output() onSubmit = new EventEmitter<FormSubmitEvent>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;
  submitted = false;

  // Estado de dropdowns abiertos para selects personalizados
  dropdownStates: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
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
        { value: field.value || '', disabled: field.disabled || field.readonly },
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
      textarea: 'textarea',
      hidden: 'hidden',
    };
    return typeMap[type];
  }

  // ================================
  // Métodos para Select con Logo
  // ================================

  toggleDropdown(fieldName: string): void {
    this.dropdownStates[fieldName] = !this.dropdownStates[fieldName];
  }

  isDropdownOpen(fieldName: string): boolean {
    return this.dropdownStates[fieldName] || false;
  }

  selectOption(fieldName: string, option: any, event: MouseEvent): void {
    event.stopPropagation();
    const control = this.form.get(fieldName);
    if (control) {
      control.setValue(option.value);
      this.dropdownStates[fieldName] = false;
    }
  }

  getSelectedOption(fieldName: string, options: any[]): any {
    const control = this.form.get(fieldName);
    return options.find(opt => opt.value === control?.value);
  }
}
