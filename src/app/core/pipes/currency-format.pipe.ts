import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear moneda con símbolo y decimales
 * Uso: {{ amount | currencyFormat }}
 * Uso con símbolo: {{ amount | currencyFormat:'COP' }}
 * Uso con símbolos personalizados: {{ amount | currencyFormat:'COP':'$' }}
 */
@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  private currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    COP: '$',
    MXN: '$',
    ARS: '$',
    PEN: 'S/',
    CLP: '$',
    BRL: 'R$',
  };

  transform(
    value: number | string,
    currency: string = 'COP',
    symbol?: string,
    decimals: number = 2
  ): string {
    if (value === null || value === undefined) return '';

    const amount = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(amount)) return '';

    const currencySymbol = symbol || this.currencySymbols[currency] || currency;
    const formatted = amount
      .toFixed(decimals)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${currencySymbol} ${formatted}`;
  }
}
