import { TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';

export const USER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'fullName', label: 'Nombre completo', sortable: true, type: 'string' },
  { key: 'email', label: 'Email', sortable: true, type: 'string' },
  { key: 'role', label: 'Rol', sortable: true, type: 'string', formatter: (role: any) => role?.name || '-' },
];

export const USER_TABLE_ACTIONS = [
  { id: 'view', label: 'Ver', icon: 'heroEye' },
  { id: 'edit', label: 'Editar', icon: 'heroPencil' },
  { id: 'delete', label: 'Eliminar', icon: 'heroTrash', confirm: true },
  { id: 'toggle-2fa', label: 'Vincular con google Auth', icon: 'heroShieldCheck' },
];
  