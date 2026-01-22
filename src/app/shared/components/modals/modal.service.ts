import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, createComponent, inject } from '@angular/core';
import { ModalInfo, ModalType } from './modal-info/modal-info';

export interface ModalOptions {
  title: string;
  message: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private componentRef: ComponentRef<ModalInfo> | null = null;

  open(options: ModalOptions): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      // Si ya hay un modal abierto, lo cerramos para evitar superposiciones
      this.close();

      // Crear el componente dinámicamente
      this.componentRef = createComponent(ModalInfo, {
        environmentInjector: this.injector
      });

      // Configurar las propiedades (inputs)
      this.componentRef.instance.show = true;
      this.componentRef.instance.title = options.title;
      this.componentRef.instance.message = options.message;
      this.componentRef.instance.type = options.type || 'info';
      
      if (options.confirmText) {
        this.componentRef.instance.confirmText = options.confirmText;
      }
      if (options.cancelText) {
        this.componentRef.instance.cancelText = options.cancelText;
      }

      // Suscribirse a los eventos (outputs)
      const subClose = this.componentRef.instance.close.subscribe(() => {
        this.close();
        resolve(false);
      });

      const subConfirm = this.componentRef.instance.confirm.subscribe(() => {
        this.close();
        resolve(true);
      });

      // Adjuntar la vista a la aplicación para la detección de cambios
      this.appRef.attachView(this.componentRef.hostView);

      // Obtener el elemento DOM y adjuntarlo al body
      const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      
      // Forzar detección de cambios inicial
      this.componentRef.changeDetectorRef.detectChanges();

      // Limpiar suscripciones cuando el componente se destruya
      this.componentRef.onDestroy(() => {
        subClose.unsubscribe();
        subConfirm.unsubscribe();
      });
    });
  }

  close() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  // Métodos de conveniencia
  success(title: string, message: string): Promise<boolean> { return this.open({ title, message, type: 'success' }); }

  error(title: string, message: string): Promise<boolean> { return this.open({ title, message, type: 'error' }); }

  warning(title: string, message: string): Promise<boolean> { return this.open({ title, message, type: 'warning' }); }

  info(title: string, message: string): Promise<boolean> { return this.open({ title, message, type: 'info' }); }

  confirm(title: string, message: string, confirmText = 'Aceptar', cancelText = 'Cancelar'): Promise<boolean> {
    return this.open({ title, message, type: 'confirm', confirmText, cancelText });
  }
}