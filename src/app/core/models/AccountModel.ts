export interface AccountModel {
    id: string;
    accountNumber: string;
    accountType: 'SAVINGS' | 'CHECKING' | 'CREDIT';
    reEnrrollment: string;
    customerId: string;
    bankId: string; 
}