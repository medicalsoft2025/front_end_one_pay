import { Component, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})


export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Output() close = new EventEmitter<void>();

  onBackdropClick() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.show) {
      this.close.emit();
    }
  }
}
