import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, TableAction, TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card';
import { BalanceChartComponent } from '../../shared/components/balance-chart/balance-chart';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { Observable } from 'rxjs';
import { TenantModel } from '../../core/models/TenantModel';
import { TenantService } from '../dashboard/tenant.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, BalanceChartComponent, DynamicTableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'nombre', label: 'Nombre', sortable: true, type: 'string' },
    { key: 'fecha', label: 'Fecha', sortable: true, type: 'date' },
    { key: 'monto', label: 'Monto', sortable: true, type: 'currency' },
  ];

  data = [
    { id: 1, nombre: 'Pago de factura', fecha: '2025-01-10', monto: 35000 },
    { id: 2, nombre: 'Compra supermercado', fecha: '2025-01-12', monto: 150000 },
    { id: 3, nombre: 'Transferencia', fecha: '2025-01-14', monto: 87000 },
  ];

  actions = [
    { id: 'view', label: 'Ver', icon: 'eye' },
    { id: 'edit', label: 'Editar', icon: 'edit' },
    { id: 'delete', label: 'Eliminar', icon: 'trash', confirm: true },
  ];

  onTableAction(evt: any) {
    console.log('ACTION:', evt);
  }
  tenant$!: Observable<TenantModel>;

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenant$ = this.tenantService.getTenantInfo();
  }
  


}
