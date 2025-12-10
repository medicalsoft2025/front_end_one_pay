import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear números de teléfono
 * Uso: {{ phone | phoneFormat }}
 * Ejemplo: 3005551234 -> +57 300 555 1234
 */
@Pipe({
  name: 'phoneFormat',
  standalone: true,
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | number, countryCode: string = '+57'): string {
    if (!value) return '';

    const phoneStr = value.toString().replace(/\D/g, '');

    if (phoneStr.length < 10) {
      return phoneStr;
    }

    const lastTenDigits = phoneStr.slice(-10);
    const areaCode = lastTenDigits.slice(0, 3);
    const middleCode = lastTenDigits.slice(3, 6);
    const lastCode = lastTenDigits.slice(6);

    return `${countryCode} ${areaCode} ${middleCode} ${lastCode}`;
  }
}
