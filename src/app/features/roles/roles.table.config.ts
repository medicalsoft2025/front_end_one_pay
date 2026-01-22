import { TableColumn } from '../../shared/components/dynamic-table/dynamic-table.types';
export const ROLES_TABLE_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Nombre del rol', sortable: true, type: 'string' },
  { key: 'description', label: 'Descripción', sortable: true, type: 'string' },
  {
    key: 'permissions',
    label: 'Permisos',
    sortable: false,
   type: 'string',
    formatter: (permissions: any) => {
      if (!permissions || permissions.length === 0) return '—';
      return permissions.map((p: any) => p.description).join(', ');
    },
  },
];



export const ROLES_TABLE_ACTIONS = [
  { id: 'view', label: 'Ver', icon: 'eye' },
  { id: 'edit', label: 'Editar', icon: 'edit' },
  { id: 'delete', label: 'Eliminar', icon: 'trash' },
];
