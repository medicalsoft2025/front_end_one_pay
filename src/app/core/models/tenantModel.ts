export type ClientType = 'NATURAL' | 'JURIDICO';
export type DocumentType = 'CC' | 'NIT' | 'CE' | 'PASSPORT';

export interface TenantModel {
  id: string;
  tenant: string;

  fullName: string;
  email: string;
  phone: string;

  document: string;
  documentType: DocumentType;
  clientType: ClientType;

  address: string;

  bankOnePayId: string | null;

  currentBalance: number;

  active: boolean;

  createdAt: string;   // ISO date
  updatedAt: string;   // ISO date
}
