import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para mostrar tiempo transcurrido (ej: hace 2 horas)
 * Uso: {{ date | timeAgo }}
 */
@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 30) {
      return 'Justo ahora';
    }

    const intervals: { [key: string]: number } = {
      año: 31536000,
      mes: 2592000,
      semana: 604800,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        const plural = interval > 1 ? 's' : '';
        return `Hace ${interval} ${unit}${plural}`;
      }
    }

    return 'Justo ahora';
  }
}
