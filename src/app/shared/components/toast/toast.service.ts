import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new Subject<ToastMessage[]>(); // subject
  private messages: ToastMessage[] = [];
  toast$ = this.toastSubject.asObservable(); // aquí sí existe asObservable()

  show(message: string, type: 'success' | 'error' = 'success') {
    this.messages.push({ message, type });
    this.toastSubject.next(this.messages);

    // auto-remover después de 3s
    setTimeout(() => {
      this.messages.shift();
      this.toastSubject.next(this.messages);
    }, 3000);
  }
}

