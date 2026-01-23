// two-factor-modal.component.ts
import { Component, Input } from '@angular/core';
import { ModalComponent } from '../../shared/components/modals/modal-customer/modal';
import { TwoFactorComponent } from './two-factor';
import { ModalService } from '../../shared/components/modals/modal.service';

@Component({
  selector: 'app-two-factor-modal',
  standalone: true,
  imports: [TwoFactorComponent, ModalComponent],
  template: `
    <app-modal [show]="true" title="Vincular con Google Auth" (close)="close()">
      <app-two-factor [userId]="userId"></app-two-factor>
    </app-modal>
  `
})
export class TwoFactorModalComponent {
  @Input() userId!: string;

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.close();
  }
}
