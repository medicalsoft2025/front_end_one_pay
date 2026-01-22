import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-menu.html',
  styleUrl: './card-menu.scss',
})
export class CardMenuComponent {
  @Input() icon?: string;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() link?: string;
}
