import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroExclamationCircle, heroExclamationTriangle, heroInformationCircle, heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';

export type ModalType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroCheckCircle, heroExclamationCircle, heroExclamationTriangle, heroInformationCircle, heroQuestionMarkCircle })],
  templateUrl: './modal-info.html',
  styleUrl: './modal-info.scss',
})
export class ModalInfo {
  @Input() show = false;
  @Input() title = '';
  @Input() message = '';
  @Input() type: ModalType = 'info';
  @Input() confirmText = 'Aceptar';
  @Input() cancelText = 'Cancelar';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  get iconName(): string {
    switch (this.type) {
      case 'success': return 'heroCheckCircle';
      case 'error': return 'heroExclamationCircle';
      case 'warning': return 'heroExclamationTriangle';
      case 'confirm': return 'heroQuestionMarkCircle';
      default: return 'heroInformationCircle';
    }
  }

  get iconClass(): string {
    // Retorna la clase de color basada en el tipo
    return `icon-${this.type}`;
  }
}
