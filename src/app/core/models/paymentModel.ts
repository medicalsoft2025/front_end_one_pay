export interface PaymentModel {
  id: string | null;
  customerId: string | null;
  tenantId: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | string;

  paymentUrl: string;
  onePayChargeId: string;
  redirectUrl: string;

  externalId: string | null;
  bankId: string | null;

  userGenerated: boolean;
  active: boolean | null;

  createdAt: string | null;
  updatedAt: string | null;
}
