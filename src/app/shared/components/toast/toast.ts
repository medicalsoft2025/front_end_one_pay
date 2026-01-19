import { Component } from '@angular/core';
import { CommonModule, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastMessage, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, AsyncPipe],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts | async" [ngClass]="toast.type" class="toast">
        {{ toast.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container { position: fixed; top: 1rem; right: 1rem; z-index: 9999; }
    .toast { padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-radius: 0.25rem; color: white; }
    .success { background-color: #28a745; }
    .error { background-color: #dc3545; }
  `]
})
export class ToastComponent {
  toasts: Observable<ToastMessage[]>;

  constructor(private toastService: ToastService) {
    this.toasts = this.toastService.toast$;
  }
}
