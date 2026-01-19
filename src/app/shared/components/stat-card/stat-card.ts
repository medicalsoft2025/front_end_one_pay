import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

// Heroicons
import {
  heroArrowTrendingUp,
  heroArrowTrendingDown,
  heroChartBar,
  heroUsers,
  heroWallet,
} from '@ng-icons/heroicons/outline';

export type TrendType = 'up' | 'down' | 'neutral';
export type ColorType = 'green' | 'red' | 'blue' | 'purple';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      heroArrowTrendingUp,
      heroArrowTrendingDown,
      heroChartBar,
      heroUsers,
      heroWallet,
    }),
  ],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() change = '';
  @Input() trend: TrendType = 'neutral';

  /** nombre del icono hero */
  @Input() icon: keyof typeof this.iconMap = 'heroChartBar';

  @Input() color: ColorType = 'blue';

  iconMap = {
    heroArrowTrendingUp: 'heroArrowTrendingUp',
    heroArrowTrendingDown: 'heroArrowTrendingDown',
    heroChartBar: 'heroChartBar',
    heroUsers: 'heroUsers',
    heroWallet: 'heroWallet',
  };

  get colorClass(): string {
    return {
      green: 'stat-green',
      red: 'stat-red',
      blue: 'stat-blue',
      purple: 'stat-purple',
    }[this.color];
  }

  get trendClass(): string {
    return {
      up: 'trend-up',
      down: 'trend-down',
      neutral: 'trend-neutral',
    }[this.trend];
  }
}
