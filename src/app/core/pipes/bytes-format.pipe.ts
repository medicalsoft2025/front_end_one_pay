import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear bytes a unidades legibles
 * Uso: {{ bytes | bytesFormat }}
 * Ejemplo: 1024 -> 1 KB
 */
@Pipe({
  name: 'bytesFormat',
  standalone: true,
})
export class BytesFormatPipe implements PipeTransform {
  private units: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];

  transform(value: number, decimals: number = 2): string {
    if (!value || value === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(value) / Math.log(k));

    return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + this.units[i];
  }
}
