/**
 * Tipos para el componente dinámico de formulario
 */

export type FormFieldType = 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'select-search' | 'checkbox' | 'textarea' | 'tel' | 'url' | 'hidden';

export interface FormFieldOption {
logo: any;
  label: string;
  value: string | number | boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  value?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  options?: FormFieldOption[];
  validators?: string[];
  rows?: number;
  cols?: number;
  helpText?: string;
  errorMessage?: string;
  icon?: string;
}

export interface DynamicFormConfig {
  fields: FormField[];
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  submitButtonColor?: 'primary' | 'success' | 'danger' | 'warning';
  submitButtonDisabled?: boolean;
}

export interface FormSubmitEvent {
  formValue: { [key: string]: any };
  isValid: boolean;
  errors?: { [key: string]: string };
}
