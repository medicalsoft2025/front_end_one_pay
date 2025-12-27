import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentModel } from '../../core/models/paymentModel';
import { PaymentService } from './payment.service';
import { CommonModule } from '@angular/common';
import { CUSTOMER_TABLE_COLUMNS, CUSTOMER_TABLE_ACTIONS } from './payment.config.table';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';

@Component({
  selector: 'app-payments',
  imports: [CommonModule, DynamicTableComponent],
  templateUrl: './payments.html',
  styleUrls: ['./payments.scss'],
})
export class PaymentsComponent {
  // Observable que emitirá los pagos
  data$!: Observable<PaymentModel[]>;

  columns = CUSTOMER_TABLE_COLUMNS;
  actions = CUSTOMER_TABLE_ACTIONS;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    console.log('PaymentsComponent ngOnInit 🔥');
    this.data$ = this.paymentService.getPayments(); // ya retorna observable
  }

  onTableAction(evt: any) {
    console.log('ACTION:', evt);
  }
}
