import { TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';

export const USER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'fullName', label: 'Nombre completo', sortable: true, type: 'string' },
  { key: 'email', label: 'Email', sortable: true, type: 'string' },
  { key: 'role', label: 'Rol', sortable: true, type: 'string', formatter: (role: any) => role?.name || '-' },
];

export const USER_TABLE_ACTIONS = [
  { id: 'view', label: 'Ver', icon: 'eye' },
  { id: 'edit', label: 'Editar', icon: 'edit' },
  { id: 'delete', label: 'Eliminar', icon: 'trash', confirm: true },
  { id: 'toggle-2fa', label: 'Vincular con google Auth', icon: 'shield' },
];
  