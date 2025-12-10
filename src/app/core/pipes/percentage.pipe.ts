import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para obtener un porcentaje de un valor
 * Uso: {{ 100 | percentage:20 }} -> 20%
 * Uso con decimales: {{ 100 | percentage:20:2 }} -> 20.00%
 */
@Pipe({
  name: 'percentage',
  standalone: true,
})
export class PercentagePipe implements PipeTransform {
  transform(value: number, percent: number, decimals: number = 0): string {
    if (!value || !percent) return '';

    const result = (value * percent) / 100;
    return `${result.toFixed(decimals)}%`;
  }
}
