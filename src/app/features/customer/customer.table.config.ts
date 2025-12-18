import { TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';

export const CUSTOMER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'documentType', label: 'Tipo de documento', sortable: true, type: 'string' },
  { key: 'email', label: 'Email', sortable: true, type: 'string' },
  { key: 'phoneNumber', label: 'Teléfono', sortable: true, type: 'string' },
  { key: 'customerType', label: 'Tipo de cliente', sortable: true, type: 'string' },
];

export const CUSTOMER_TABLE_ACTIONS = [
  { id: 'view', label: 'Ver', icon: 'eye' },
  { id: 'edit', label: 'Editar', icon: 'edit' },
  { id: 'delete', label: 'Eliminar', icon: 'trash', confirm: true },
];
