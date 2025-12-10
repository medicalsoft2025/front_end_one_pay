import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form';
import { DynamicFormConfig } from './dynamic-form.types';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.config = { fields: [] };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should build form with fields', () => {
    component.config = {
      fields: [
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
      ],
    };

    fixture.detectChanges();

    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('email')).toBeTruthy();
  });

  it('should validate required fields', () => {
    component.config = {
      fields: [{ name: 'name', label: 'Nombre', type: 'text', required: true }],
    };

    fixture.detectChanges();

    const nameControl = component.form.get('name');
    nameControl?.markAsDirty();

    expect(nameControl?.invalid).toBeTruthy();

    nameControl?.setValue('John');
    expect(nameControl?.invalid).toBeFalsy();
  });

  it('should validate email format', () => {
    component.config = {
      fields: [{ name: 'email', label: 'Email', type: 'email', required: true }],
    };

    fixture.detectChanges();

    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid');
    expect(emailControl?.invalid).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.invalid).toBeFalsy();
  });

  it('should emit submit event with valid form', () => {
    component.config = {
      fields: [{ name: 'name', label: 'Nombre', type: 'text', required: true }],
    };

    fixture.detectChanges();

    const submitSpy = vi.spyOn(component.onSubmit, 'emit');
    component.form.get('name')?.setValue('John');
    component.handleSubmit();

    expect(submitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isValid: true,
        formValue: expect.objectContaining({ name: 'John' }),
      })
    );
  });

  it('should emit submit event with invalid form', () => {
    component.config = {
      fields: [{ name: 'name', label: 'Nombre', type: 'text', required: true }],
    };

    fixture.detectChanges();

    const submitSpy = vi.spyOn(component.onSubmit, 'emit');
    component.handleSubmit();

    expect(submitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isValid: false,
        errors: expect.any(Object),
      })
    );
  });

  it('should emit cancel event', () => {
    component.config = { fields: [] };
    fixture.detectChanges();

    const cancelSpy = vi.spyOn(component.onCancel, 'emit');
    component.handleCancel();

    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should reset form on cancel', () => {
    component.config = {
      fields: [{ name: 'name', label: 'Nombre', type: 'text' }],
    };

    fixture.detectChanges();

    component.form.get('name')?.setValue('John');
    component.submitted = true;

    component.resetForm();

    expect(component.form.get('name')?.value).toBeNull();
    expect(component.submitted).toBeFalsy();
  });

  it('should validate minLength', () => {
    component.config = {
      fields: [{ name: 'name', label: 'Nombre', type: 'text', minLength: 3 }],
    };

    fixture.detectChanges();

    const nameControl = component.form.get('name');
    nameControl?.setValue('ab');
    expect(nameControl?.invalid).toBeTruthy();

    nameControl?.setValue('abc');
    expect(nameControl?.invalid).toBeFalsy();
  });

  it('should validate maxLength', () => {
    component.config = {
      fields: [{ name: 'name', label: 'Nombre', type: 'text', maxLength: 10 }],
    };

    fixture.detectChanges();

    const nameControl = component.form.get('name');
    nameControl?.setValue('12345678901');
    expect(nameControl?.invalid).toBeTruthy();

    nameControl?.setValue('1234567890');
    expect(nameControl?.invalid).toBeFalsy();
  });

  it('should handle select fields with options', () => {
    component.config = {
      fields: [
        {
          name: 'country',
          label: 'País',
          type: 'select',
          options: [
            { label: 'Colombia', value: 'CO' },
            { label: 'México', value: 'MX' },
          ],
        },
      ],
    };

    fixture.detectChanges();

    const countryControl = component.form.get('country');
    expect(countryControl).toBeTruthy();

    countryControl?.setValue('CO');
    expect(countryControl?.value).toBe('CO');
  });

  it('should return correct field type', () => {
    component.config = { fields: [] };
    fixture.detectChanges();

    expect(component.getFieldType('email')).toBe('email');
    expect(component.getFieldType('password')).toBe('password');
    expect(component.getFieldType('number')).toBe('number');
  });
});
