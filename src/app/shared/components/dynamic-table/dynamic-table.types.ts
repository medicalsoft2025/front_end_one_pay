export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'string' | 'number' | 'date' | 'currency' | 'boolean' | 'custom';
  width?: string;
  formatter?: (value: any, row: any) => string;
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  class?: string;
  confirm?: boolean;
  visible?: (row: any) => boolean;
}

export interface TableEvent {
  action: string;
  data: any;
}
