export interface BankModel {
  id: string;
  name: string;
  supported_types: string[];
  mask: string;
  transaction_avg: number | null;
  available: boolean;
  connection_type: 'CONFIRMATION' | 'DATA';
  logo: string;
  instructions: string;
  base64_logo: string;
}