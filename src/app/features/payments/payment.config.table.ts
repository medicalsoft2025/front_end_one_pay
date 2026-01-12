import { TableAction, TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';

export const CUSTOMER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'status', label: 'status', sortable: true, type: 'string' },
  { key: 'paymentUrl', label: 'Link de pago', sortable: true, type: 'string' },
  { key: 'bank', label: 'banco', sortable: true, type: 'string' },
  { key: 'createdAt', label: 'Fecha de creación', sortable: true, type: 'date' },
  { key: 'amount', label: 'Monto', sortable: true, type: 'number' },
];

export const CUSTOMER_TABLE_ACTIONS: TableAction[] = [
  { id: 'view', label: 'Ver', icon: 'eye' },
  { id: 'edit', label: 'Editar', icon: 'edit' },
  { id: 'delete', label: 'Eliminar', icon: 'trash', confirm: true },
  { id: 'resend', label: 'Reenviar', icon: 'send', confirm: true },
];
