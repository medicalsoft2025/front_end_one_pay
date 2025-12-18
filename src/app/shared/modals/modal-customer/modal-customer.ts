import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form';

@Component({
  selector: 'app-modal-customer',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './modal-customer.html',
  styleUrl: './modal-customer.scss',
})
export class ModalCustomer {



  @Input() customerFormConfig: any;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitCustomer = new EventEmitter<any>();

  close() {
    this.closeModal.emit();
  }

  onSubmit(data: any) {
    this.submitCustomer.emit(data);
    this.close();
  }
}
