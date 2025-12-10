import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para convertir texto a mayúsculas
 * Uso: {{ text | capitalize }}
 */
@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
