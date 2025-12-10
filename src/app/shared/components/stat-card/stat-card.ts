import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TrendType = 'up' | 'down' | 'neutral';
export type ColorType = 'green' | 'red' | 'blue' | 'purple';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() change: string = '';
  @Input() trend: TrendType = 'neutral';
  @Input() icon: string = '';
  @Input() color: ColorType = 'blue';

  get colorClass(): string {
    const colorMap: Record<ColorType, string> = {
      green: 'stat-green',
      red: 'stat-red',
      blue: 'stat-blue',
      purple: 'stat-purple',
    };
    return colorMap[this.color];
  }

  get trendClass(): string {
    const trendMap: Record<TrendType, string> = {
      up: 'trend-up',
      down: 'trend-down',
      neutral: 'trend-neutral',
    };
    return trendMap[this.trend];
  }

  get trendIcon(): string {
    const trendIcons: Record<TrendType, string> = {
      up: '📈',
      down: '📉',
      neutral: '➡️',
    };
    return trendIcons[this.trend];
  }
}
