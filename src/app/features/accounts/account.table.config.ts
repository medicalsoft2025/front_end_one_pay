import { TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';

export const ACCOUNT_TABLE_CONFIG: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, type: 'string' },
  { key: 'accountNumber', label: 'Número de cuenta', sortable: true, type: 'string' },
  { key: 'accountType', label: 'Tipo de cuenta', sortable: true, type: 'string' },
  { key: 'reEnrrollment', label: 'Reinscripción', sortable: true, type: 'string' },
  { key: 'customerId', label: 'ID del cliente', sortable: true, type: 'string' },
  { key: 'bankId', label: 'ID del banco', sortable: true, type: 'string' },
];

export const ACCOUNT_TABLE_ACTIONS = [
  { id: 'view', label: 'Ver', icon: 'eye' },
  { id: 'edit', label: 'Editar', icon: 'edit' },
  { id: 'delete', label: 'Eliminar', icon: 'trash', confirm: true },
];
