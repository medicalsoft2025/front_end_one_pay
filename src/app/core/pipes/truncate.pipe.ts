import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para truncar texto a una longitud específica
 * Uso: {{ text | truncate:20 }}
 * Uso con sufijo: {{ text | truncate:20:'...' }}
 */
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, ellipsis: string = '...'): string {
    if (!value) return value;
    if (value.length <= limit) return value;
    return value.substring(0, limit).trim() + ellipsis;
  }
}
