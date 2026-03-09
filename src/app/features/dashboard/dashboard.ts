import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, TableAction, TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card';
import { BalanceChartComponent } from '../../shared/components/balance-chart/balance-chart';
import { Observable, map, shareReplay } from 'rxjs';
import { TenantModel } from '../../core/models/tenantModel';
import { TenantService } from '../dashboard/tenant.service';
import { TransactionService } from '../audit/transactions/transactions.service';
import { TransactionModel } from '../../core/models/transaction.model';
import { heroArrowTrendingUp, heroArrowTrendingDown } from '@ng-icons/heroicons/outline';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, BalanceChartComponent, NgIconsModule],
  providers: [provideIcons({ heroArrowTrendingUp, heroArrowTrendingDown })],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  // Columnas para la tabla basadas en el modelo de transacciones
  columns: TableColumn[] = [
    { key: 'type', label: 'Tipo', sortable: true },
    { key: 'amount', label: 'Monto', sortable: true, type: 'currency' },
    { key: 'createdAt', label: 'Fecha', sortable: true, type: 'date' },
    { key: 'balanceAfter', label: 'Saldo Posterior', type: 'currency' },
  ];

  actions: TableAction[] = [
    { id: 'view', label: 'Ver', icon: 'eye' },
  ];

  onTableAction(evt: any) {
    console.log('ACTION:', evt);
  }
  tenant$!: Observable<TenantModel>;
  recentTransactions$!: Observable<TransactionModel[]>;
  transactions$!: Observable<TransactionModel[]>;

  constructor(
    private tenantService: TenantService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.tenant$ = this.tenantService.getTenantInfo();

    this.transactions$ = this.transactionService.getTransactions().pipe(
      map(transactions => transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())),
      shareReplay(1) // 3. Cacheamos el resultado para suscriptores subsecuentes.
    );

    this.recentTransactions$ = this.transactions$.pipe(
      map(transactions => transactions.slice(0, 5))
    );
  }
  
  getTransactionTypeInSpanish(type: string): string {
    switch (type?.toLowerCase()) {
      case 'deposit':
        return 'Depósito';
      case 'payment':
        return 'Pago';
      default:
        return type || 'Transacción';
    }
  }

}
