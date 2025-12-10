import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table';
import { TableColumn, TableAction, TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DynamicTableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'amount', label: 'Monto', type: 'currency', sortable: true },
    { key: 'date', label: 'Fecha de Registro', type: 'date', sortable: true },
  ];

  data: any[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      status: 'Activo',
      amount: 5000.5,
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      status: 'Activo',
      amount: 7500.25,
      date: '2024-02-20',
    },
    {
      id: 3,
      name: 'Pedro López',
      email: 'pedro@example.com',
      status: 'Inactivo',
      amount: 3200.0,
      date: '2024-03-10',
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana@example.com',
      status: 'Activo',
      amount: 8900.75,
      date: '2024-04-05',
    },
    {
      id: 5,
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      status: 'Activo',
      amount: 6200.0,
      date: '2024-05-12',
    },
    {
      id: 6,
      name: 'Laura Sánchez',
      email: 'laura@example.com',
      status: 'Inactivo',
      amount: 4100.5,
      date: '2024-06-18',
    },
    {
      id: 7,
      name: 'David Torres',
      email: 'david@example.com',
      status: 'Activo',
      amount: 9300.25,
      date: '2024-07-22',
    },
    {
      id: 8,
      name: 'Elena Díaz',
      email: 'elena@example.com',
      status: 'Activo',
      amount: 5800.0,
      date: '2024-08-30',
    },
  ];

  actions: TableAction[] = [
    { id: 'view', label: 'Ver', icon: '👁️' },
    { id: 'edit', label: 'Editar', icon: '✏️' },
    { id: 'delete', label: 'Eliminar', icon: '🗑️', confirm: true },
  ];

  onTableAction(event: TableEvent) {
    console.log(`Acción: ${event.action}`, event.data);

    switch (event.action) {
      case 'view':
        console.log('Ver detalles de:', event.data);
        alert(`Ver detalles de ${event.data.name}`);
        break;
      case 'edit':
        console.log('Editar:', event.data);
        alert(`Editar ${event.data.name}`);
        break;
      case 'delete':
        console.log('Eliminar:', event.data);
        this.data = this.data.filter((item) => item.id !== event.data.id);
        alert(`${event.data.name} eliminado`);
        break;
    }
  }
}
